import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, checkUserPlanLimits } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSermon } from '@/lib/openai'

export async function GET() {
  try {
    const user = await getAuthenticatedUser()

    // Verificar acesso ao histórico baseado no plano
    let sermonsQuery: any = {
      where: { userId: user.clerkUserId },
      orderBy: { createdAt: 'desc' }
    }

    if (user.role === 'free') {
      return NextResponse.json(
        { error: 'Plano gratuito não tem acesso ao histórico' },
        { status: 403 }
      )
    } else if (user.role === 'basic') {
      sermonsQuery.take = 5
    }
    // Pro e admin têm acesso ilimitado

    const sermons = await prisma.sermon.findMany(sermonsQuery)

    return NextResponse.json(sermons)
  } catch (error) {
    console.error('Erro ao buscar sermões:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    
    // Verificar limites do plano
    await checkUserPlanLimits(user.clerkUserId, 'sermon_generation')

    const body = await req.json()
    const {
      tema,
      proposito,
      publico,
      duracao,
      estilo,
      contexto,
      conteudo_usuario,
      urls_referencia
    } = body

    if (!tema) {
      return NextResponse.json(
        { error: 'Tema é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar DNA ativo do usuário
    const dnaProfile = await prisma.dnaProfile.findFirst({
      where: { userId: user.clerkUserId },
      orderBy: [
        { type: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    if (!dnaProfile) {
      return NextResponse.json(
        { error: 'DNA do pregador não encontrado' },
        { status: 404 }
      )
    }

    // Simular busca RAG (por enquanto)
    const ragContext = `Contexto bíblico relacionado ao tema "${tema}". 
    Este é um contexto simulado que seria obtido através de busca vetorial na base de conhecimento.`

    // Preparar parâmetros para a IA
    const parameters = {
      tema,
      proposito,
      publico,
      duracao,
      estilo,
      contexto,
      conteudo_usuario,
      urls_referencia
    }

    // Gerar sermão usando OpenAI
    const sermonData = await generateSermon(
      dnaProfile.customAttributes,
      parameters,
      ragContext
    )

    // Salvar no banco de dados
    const sermon = await prisma.sermon.create({
      data: {
        userId: user.clerkUserId,
        title: sermonData.titulo,
        content: sermonData.conteudo,
        parameters: parameters,
        enrichmentSuggestions: sermonData.sugestoes_enriquecimento,
        qualityAssessment: sermonData.autoavaliacao,
        planType: user.role,
      }
    })

    return NextResponse.json(sermon, { status: 201 })
  } catch (error) {
    console.error('Erro ao gerar sermão:', error)
    
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

