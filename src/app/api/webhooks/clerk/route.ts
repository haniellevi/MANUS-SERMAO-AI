import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

type WebhookEvent = {
  type: string
  data: {
    id: string
    email_addresses: Array<{ email_address: string }>
    first_name?: string
    last_name?: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      throw new Error('CLERK_WEBHOOK_SECRET não configurado')
    }

    // Obter headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Headers de webhook inválidos', { status: 400 })
    }

    // Obter o corpo da requisição
    const payload = await req.text()

    // Verificar a assinatura do webhook
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Erro ao verificar webhook:', err)
      return new NextResponse('Assinatura de webhook inválida', { status: 400 })
    }

    // Processar o evento
    const { type, data } = evt

    switch (type) {
      case 'user.created':
        await handleUserCreated(data)
        break
      case 'user.updated':
        await handleUserUpdated(data)
        break
      case 'user.deleted':
        await handleUserDeleted(data)
        break
      default:
        console.log(`Evento não tratado: ${type}`)
    }

    return new NextResponse('Webhook processado com sucesso', { status: 200 })
  } catch (error) {
    console.error('Erro no webhook do Clerk:', error)
    return new NextResponse('Erro interno do servidor', { status: 500 })
  }
}

async function handleUserCreated(data: WebhookEvent['data']) {
  try {
    const email = data.email_addresses[0]?.email_address
    const name = data.first_name && data.last_name 
      ? `${data.first_name} ${data.last_name}` 
      : data.first_name || null

    // Criar usuário no banco de dados local
    const user = await prisma.user.create({
      data: {
        clerkUserId: data.id,
        email: email,
        name: name,
        role: 'free',
        isActive: true,
      }
    })

    // Criar DNA padrão para o usuário
    await prisma.dnaProfile.create({
      data: {
        userId: user.clerkUserId,
        type: 'padrao',
        name: 'DNA Padrão',
        customAttributes: {
          estilo: 'expositivo',
          tom: 'didático',
          vocabulario: 'intermediário',
          estrutura: 'tradicional',
          ilustracoes: 'cotidianas',
          aplicacao: 'prática',
          publico_alvo: 'geral',
          pontos_fortes: ['clareza', 'organização'],
          caracteristicas_unicas: 'Pregação equilibrada e acessível'
        }
      }
    })

    console.log(`Usuário criado: ${user.clerkUserId}`)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

async function handleUserUpdated(data: WebhookEvent['data']) {
  try {
    const email = data.email_addresses[0]?.email_address
    const name = data.first_name && data.last_name 
      ? `${data.first_name} ${data.last_name}` 
      : data.first_name || null

    await prisma.user.update({
      where: { clerkUserId: data.id },
      data: {
        email: email,
        name: name,
      }
    })

    console.log(`Usuário atualizado: ${data.id}`)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    throw error
  }
}

async function handleUserDeleted(data: WebhookEvent['data']) {
  try {
    await prisma.user.delete({
      where: { clerkUserId: data.id }
    })

    console.log(`Usuário deletado: ${data.id}`)
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    throw error
  }
}

