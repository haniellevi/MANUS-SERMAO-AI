'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Zap,
  Loader2,
  Target,
  Users,
  Clock,
  BookOpen,
  MessageSquare,
  Link as LinkIcon
} from 'lucide-react'
import Link from 'next/link'

export default function SermonGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [step, setStep] = useState<'form' | 'generating' | 'result'>('form')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setStep('generating')
    
    // Simular geração
    setTimeout(() => {
      setIsGenerating(false)
      setStep('result')
    }, 5000)
  }

  if (step === 'result') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Sermão Gerado</h1>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sermon Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">O Amor Incondicional de Deus</CardTitle>
                      <CardDescription>Gerado em 3 segundos • Baseado no seu DNA</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Qualidade: 8.7/10</Badge>
                  </div>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Introdução</h2>
                    <p className="mb-4">
                      Vivemos em um mundo onde o amor muitas vezes vem com condições. 
                      "Eu te amo se...", "Eu te aceito quando...". Mas hoje vamos descobrir 
                      uma verdade que pode transformar completamente nossa perspectiva: 
                      o amor de Deus não tem condições.
                    </p>

                    <h2 className="text-xl font-bold mb-4">1. O Amor que Não Depende de Nós</h2>
                    <p className="mb-4">
                      <strong>Romanos 5:8</strong> - "Mas Deus demonstra seu amor por nós: 
                      Cristo morreu em nosso favor quando ainda éramos pecadores."
                    </p>
                    <p className="mb-4">
                      Imagine um pai que ama seu filho mesmo quando ele comete erros. 
                      Assim é o amor de Deus por nós - não baseado no que fazemos, 
                      mas em quem Ele é.
                    </p>

                    <h2 className="text-xl font-bold mb-4">2. O Amor que Transforma</h2>
                    <p className="mb-4">
                      <strong>1 João 4:19</strong> - "Nós amamos porque ele nos amou primeiro."
                    </p>
                    <p className="mb-4">
                      Quando experimentamos esse amor incondicional, somos transformados. 
                      Não amamos para ser aceitos, mas porque já fomos aceitos.
                    </p>

                    <h2 className="text-xl font-bold mb-4">3. O Amor que Liberta</h2>
                    <p className="mb-4">
                      <strong>Romanos 8:1</strong> - "Portanto, agora já não há condenação 
                      para os que estão em Cristo Jesus."
                    </p>
                    <p className="mb-4">
                      Este amor nos liberta do medo, da culpa e da necessidade de 
                      performance espiritual.
                    </p>

                    <h2 className="text-xl font-bold mb-4">Conclusão</h2>
                    <p className="mb-4">
                      O amor de Deus não é algo que precisamos conquistar - é algo que 
                      podemos simplesmente receber. Hoje, permita que essa verdade 
                      transforme sua vida.
                    </p>

                    <h2 className="text-xl font-bold mb-4">Aplicação Prática</h2>
                    <ul className="list-disc pl-6 mb-4">
                      <li>Pare de tentar "merecer" o amor de Deus</li>
                      <li>Compartilhe esse amor incondicional com outros</li>
                      <li>Viva na liberdade que este amor proporciona</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quality Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Autoavaliação da IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600">8.7/10</div>
                    <p className="text-sm text-gray-600">Qualidade Geral</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Estrutura</span>
                      <span className="font-medium">9/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aplicação</span>
                      <span className="font-medium">8/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clareza</span>
                      <span className="font-medium">9/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Relevância</span>
                      <span className="font-medium">8/10</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    Sermão bem estruturado com aplicação prática clara. 
                    Recomenda-se adicionar mais uma ilustração no segundo ponto.
                  </p>
                </CardContent>
              </Card>

              {/* Enrichment Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sugestões de Enriquecimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">💡 Ilustração</h4>
                    <p className="text-sm text-blue-700">
                      História do filho pródigo modernizada: um jovem que volta para casa 
                      após erros e é recebido com festa.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">🎯 Dinâmica</h4>
                    <p className="text-sm text-green-700">
                      Peça para a congregação escrever em um papel algo que os faz 
                      sentir "não merecedores" e depois rasgue simbolicamente.
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-1">❓ Pergunta Reflexiva</h4>
                    <p className="text-sm text-purple-700">
                      "Se você soubesse que Deus te ama incondicionalmente, 
                      o que mudaria em sua vida hoje?"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full">
                  Salvar Sermão
                </Button>
                <Button variant="outline" className="w-full">
                  Gerar Variação
                </Button>
                <Button variant="outline" className="w-full">
                  Exportar PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Gerar Sermão</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">5 de 8 sermões usados</Badge>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {step === 'form' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Sermão</CardTitle>
                <CardDescription>
                  Preencha os detalhes abaixo para gerar um sermão personalizado baseado no seu DNA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tema Central */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Target className="inline h-4 w-4 mr-2" />
                      Tema Central *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: O amor de Deus, Fé em tempos difíceis..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Propósito */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <BookOpen className="inline h-4 w-4 mr-2" />
                      Propósito
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Selecione o propósito</option>
                      <option value="inspirar">Inspirar</option>
                      <option value="ensinar">Ensinar</option>
                      <option value="consolar">Consolar</option>
                      <option value="desafiar">Desafiar</option>
                      <option value="evangelizar">Evangelizar</option>
                    </select>
                  </div>

                  {/* Público-alvo */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="inline h-4 w-4 mr-2" />
                      Público-alvo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Jovens, Famílias, Líderes, Congregação geral..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Duração */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Duração Aproximada
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Selecione a duração</option>
                      <option value="15">15 minutos</option>
                      <option value="20">20 minutos</option>
                      <option value="30">30 minutos</option>
                      <option value="45">45 minutos</option>
                      <option value="60">60 minutos</option>
                    </select>
                  </div>

                  {/* Estilo */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Estilo de Pregação
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Usar meu DNA padrão</option>
                      <option value="expositivo">Expositivo</option>
                      <option value="tematico">Temático</option>
                      <option value="narrativo">Narrativo</option>
                      <option value="biografico">Biográfico</option>
                    </select>
                  </div>

                  {/* Contexto Específico */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contexto Específico
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Culto de Natal, Conferência de jovens, Momento de crise na igreja..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Conteúdo do Usuário */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-2" />
                      Seu Próprio Prompt / Resumo
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Adicione suas próprias ideias, rascunhos ou direcionamentos específicos que devem ser priorizados..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* URLs de Referência */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <LinkIcon className="inline h-4 w-4 mr-2" />
                      URLs de Referência
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Links de outros sermões ou recursos para inspiração (um por linha)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Link href="/dashboard">
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </Link>
                    <Button type="submit">
                      <Zap className="mr-2 h-4 w-4" />
                      Gerar Sermão
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'generating' && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Gerando seu sermão personalizado...
                  </h3>
                  <div className="space-y-3 text-blue-700">
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Analisando seu DNA de pregação
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Buscando na base de conhecimento teológica
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Estruturando o sermão com IA
                    </p>
                    <p className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Gerando sugestões de enriquecimento
                    </p>
                  </div>
                  <p className="text-sm text-blue-600 mt-6">
                    Isso geralmente leva entre 10-30 segundos...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

