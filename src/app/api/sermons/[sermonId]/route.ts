import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { sermonId: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    const { sermonId } = params

    const sermon = await prisma.sermon.findFirst({
      where: {
        id: sermonId,
        userId: user.clerkUserId
      }
    })

    if (!sermon) {
      return NextResponse.json(
        { error: 'Sermão não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(sermon)
  } catch (error) {
    console.error('Erro ao buscar sermão:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

