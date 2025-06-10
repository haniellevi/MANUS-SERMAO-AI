import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAdmin()

    // Métricas básicas
    const totalUsers = await prisma.user.count()
    const totalSermons = await prisma.sermon.count()
    
    // Sermões por mês (últimos 6 meses)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    
    const sermonsThisMonth = await prisma.sermon.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })

    // Distribuição de usuários por plano
    const usersByPlan = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true
      }
    })

    // Uso de DNA (padrão vs customizado)
    const dnaUsage = await prisma.dnaProfile.groupBy({
      by: ['type'],
      _count: {
        type: true
      }
    })

    const metrics = {
      totalUsers,
      totalSermons,
      sermonsThisMonth,
      usersByPlan: usersByPlan.reduce((acc, item) => {
        acc[item.role] = item._count.role
        return acc
      }, {} as Record<string, number>),
      dnaUsage: dnaUsage.reduce((acc, item) => {
        acc[item.type] = item._count.type
        return acc
      }, {} as Record<string, number>),
      // Simulado - em produção seria obtido de logs ou métricas da OpenAI
      openaiTokensUsed: 150000
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Erro ao buscar métricas:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

