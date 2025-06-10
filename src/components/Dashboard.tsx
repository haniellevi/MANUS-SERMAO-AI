'use client'

import { UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  FileText, 
  History, 
  Plus, 
  Settings, 
  Zap,
  Clock,
  Target,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Sermão AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Plano Basic</Badge>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-gray-600">
            Pronto para criar sermões inspiradores? Vamos começar.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sermões este mês</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                de 8 disponíveis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DNA Ativo</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Customizado</div>
              <p className="text-xs text-muted-foreground">
                Atualizado há 2 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Economizado</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12h</div>
              <p className="text-xs text-muted-foreground">
                neste mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualidade Média</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7</div>
              <p className="text-xs text-muted-foreground">
                de 10 pontos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Generate Sermon */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-blue-600" />
                <CardTitle>Gerar Novo Sermão</CardTitle>
              </div>
              <CardDescription>
                Crie um sermão personalizado baseado no seu DNA de pregação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/sermons/new">
                <Button size="lg" className="w-full">
                  <Plus className="mr-2 h-5 w-5" />
                  Começar Agora
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Manage DNA */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-600" />
                <CardTitle>Gerenciar Meu DNA</CardTitle>
              </div>
              <CardDescription>
                Atualize seu perfil de pregação para sermões mais personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dna">
                <Button size="lg" variant="outline" className="w-full">
                  <Settings className="mr-2 h-5 w-5" />
                  Configurar DNA
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Sermons */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-gray-600" />
                  <CardTitle>Sermões Recentes</CardTitle>
                </div>
                <Link href="/sermons/history">
                  <Button variant="ghost" size="sm">Ver todos</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">O Amor de Deus</h4>
                    <p className="text-sm text-gray-600">Criado há 2 dias</p>
                  </div>
                  <Badge variant="secondary">8.5</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">Fé em Tempos Difíceis</h4>
                    <p className="text-sm text-gray-600">Criado há 1 semana</p>
                  </div>
                  <Badge variant="secondary">9.2</Badge>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium">A Graça Transformadora</h4>
                    <p className="text-sm text-gray-600">Criado há 2 semanas</p>
                  </div>
                  <Badge variant="secondary">8.8</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <CardTitle>Dicas & Recursos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">
                    💡 Dica do Dia
                  </h4>
                  <p className="text-sm text-green-700">
                    Para sermões mais impactantes, inclua uma ilustração pessoal 
                    que conecte com a experiência do seu público.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    📚 Recurso em Destaque
                  </h4>
                  <p className="text-sm text-blue-700">
                    Novo comentário bíblico sobre Romanos adicionado à base de conhecimento.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">
                    🎯 Meta Semanal
                  </h4>
                  <p className="text-sm text-purple-700">
                    Você está a 2 sermões de atingir sua meta semanal de preparação!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

