import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, checkUserPlanLimits } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createDnaProfile } from '@/lib/openai'

export async function GET() {
  try {
    const user = await getAuthenticatedUser()

    // Buscar DNA ativo do usuário (priorizar customizado)
    const dnaProfile = await prisma.dnaProfile.findFirst({
      where: { userId: user.clerkUserId },
      orderBy: [
        { type: 'desc' }, // customizado vem antes de padrao
        { createdAt: 'desc' }
      ]
    })

    if (!dnaProfile) {
      return NextResponse.json({ error: 'DNA não encontrado' }, { status: 404 })
    }

    return NextResponse.json(dnaProfile)
  } catch (error) {
    console.error('Erro ao buscar DNA:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    
    // Verificar se o usuário pode criar DNA customizado
    await checkUserPlanLimits(user.clerkUserId, 'dna_creation')

    const formData = await req.formData()
    const descricao = formData.get('descricao') as string
    const youtubeLink = formData.get('youtubeLink') as string
    const arquivo = formData.get('arquivo') as File | null

    if (!descricao && !youtubeLink && !arquivo) {
      return NextResponse.json(
        { error: 'Pelo menos um campo deve ser preenchido' },
        { status: 400 }
      )
    }

    // Processar os dados para criar o corpus
    let corpus = ''

    // Adicionar descrição
    if (descricao) {
      corpus += `Descrição pessoal: ${descricao}\n\n`
    }

    // Processar arquivo (simulado por enquanto)
    if (arquivo) {
      const fileText = await arquivo.text()
      corpus += `Conteúdo do arquivo: ${fileText}\n\n`
    }

    // Processar YouTube (simulado por enquanto)
    if (youtubeLink) {
      corpus += `Link do YouTube fornecido: ${youtubeLink}\n\n`
      // TODO: Implementar transcrição real do YouTube
    }

    if (!corpus.trim()) {
      return NextResponse.json(
        { error: 'Nenhum conteúdo válido foi fornecido' },
        { status: 400 }
      )
    }

    // Criar DNA usando OpenAI
    const dnaAttributes = await createDnaProfile(corpus)

    // Salvar no banco de dados
    const dnaProfile = await prisma.dnaProfile.create({
      data: {
        userId: user.clerkUserId,
        type: 'customizado',
        name: 'DNA Customizado',
        customAttributes: dnaAttributes,
        calculatedPpm: youtubeLink ? 150 : null, // Valor simulado
        calculatedAvgDurationMins: youtubeLink ? 30 : null, // Valor simulado
      }
    })

    return NextResponse.json(dnaProfile, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar DNA:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

