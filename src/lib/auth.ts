// import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

// Função temporária para desenvolvimento - simula autenticação
export async function getCurrentUser() {
  // Em desenvolvimento, retorna um usuário mock
  return {
    id: 'user_demo_123',
    clerkId: 'clerk_demo_123',
    email: 'demo@sermonaiai.com',
    name: 'Pastor Demo',
    plan: 'BASIC'
  }
}

// Função para verificar se o usuário é admin
export async function isAdmin() {
  // Em desenvolvimento, sempre retorna true
  return true
}

// Função para verificar autenticação em API routes
export async function requireAuth(request: NextRequest) {
  // Em desenvolvimento, sempre retorna usuário mock
  return {
    userId: 'user_demo_123',
    user: await getCurrentUser()
  }
}

// Função para verificar se o usuário tem permissão admin
export async function requireAdmin(request: NextRequest) {
  const auth = await requireAuth(request)
  const adminCheck = await isAdmin()
  
  if (!adminCheck) {
    throw new Error('Acesso negado: permissões de administrador necessárias')
  }
  
  return auth
}

// Função para obter usuário autenticado (alias para getCurrentUser)
export async function getAuthenticatedUser() {
  return await getCurrentUser()
}

// Função para verificar limites do plano do usuário
export async function checkUserPlanLimits(userId: string) {
  // Em desenvolvimento, sempre permite
  return {
    canCreateSermon: true,
    sermonsThisMonth: 5,
    monthlyLimit: 50,
    plan: 'BASIC'
  }
}

