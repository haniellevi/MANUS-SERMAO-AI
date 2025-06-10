'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  ArrowLeft,
  Upload,
  Youtube,
  FileText,
  Save,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function DnaManager() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'view' | 'create'>('view')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular processamento
    setTimeout(() => {
      setIsLoading(false)
      setActiveTab('view')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Meu DNA</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Plano Basic</Badge>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button 
            variant={activeTab === 'view' ? 'default' : 'outline'}
            onClick={() => setActiveTab('view')}
          >
            Ver DNA Atual
          </Button>
          <Button 
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
          >
            Criar/Atualizar DNA
          </Button>
        </div>

        {activeTab === 'view' && (
          <div className="space-y-6">
            {/* Current DNA */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>DNA Customizado</CardTitle>
                    <CardDescription>Atualizado há 2 dias</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Características Principais</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Estilo:</strong> Expositivo com elementos narrativos</li>
                      <li><strong>Tom:</strong> Inspirador e pastoral</li>
                      <li><strong>Vocabulário:</strong> Intermediário, acessível</li>
                      <li><strong>Estrutura:</strong> Três pontos principais com aplicação</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pontos Fortes</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Uso efetivo de ilustrações cotidianas</li>
                      <li>• Aplicação prática clara</li>
                      <li>• Conexão emocional com o público</li>
                      <li>• Fundamentação bíblica sólida</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Características Únicas</h4>
                  <p className="text-blue-700 text-sm">
                    Seu estilo combina profundidade teológica com simplicidade na comunicação, 
                    usando histórias pessoais e exemplos do cotidiano para tornar conceitos 
                    complexos acessíveis ao público geral.
                  </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Palavras por Minuto</h4>
                    <p className="text-2xl font-bold text-blue-600">145</p>
                    <p className="text-sm text-gray-600">Ritmo moderado</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Duração Média</h4>
                    <p className="text-2xl font-bold text-green-600">28 min</p>
                    <p className="text-sm text-gray-600">Baseado em análise de vídeos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar/Atualizar DNA Customizado</CardTitle>
                <CardDescription>
                  Forneça materiais para que nossa IA analise seu estilo único de pregação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Upload className="inline h-4 w-4 mr-2" />
                      Upload de Arquivo (PDF, DOCX, ODT, TXT)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Arraste um arquivo aqui ou clique para selecionar
                      </p>
                      <input type="file" className="hidden" accept=".pdf,.docx,.odt,.txt" />
                    </div>
                  </div>

                  {/* YouTube Link */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Youtube className="inline h-4 w-4 mr-2" />
                      Link do YouTube
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Link de um vídeo seu pregando para análise de estilo e ritmo
                    </p>
                  </div>

                  {/* Personal Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <FileText className="inline h-4 w-4 mr-2" />
                      Como você se vê como pregador?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Descreva seu estilo de pregação, seus pontos fortes, como você gosta de estruturar seus sermões..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setActiveTab('view')}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Criar DNA
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {isLoading && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-blue-800 mb-2">Analisando seu DNA...</h3>
                    <p className="text-blue-700 text-sm">
                      Nossa IA está processando seus materiais para extrair suas características únicas de pregação.
                      Isso pode levar alguns minutos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

