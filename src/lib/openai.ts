import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function createDnaProfile(corpus: string) {
  try {
    const systemPrompt = `Você é um especialista em análise de estilo de pregação. Analise o texto fornecido e extraia as características únicas do pregador.

Retorne um JSON com as seguintes informações:
{
  "estilo": "string - estilo de pregação (expositivo, temático, narrativo, etc.)",
  "tom": "string - tom predominante (inspirador, didático, pastoral, etc.)",
  "vocabulario": "string - nível de vocabulário (simples, intermediário, acadêmico)",
  "estrutura": "string - como organiza os sermões",
  "ilustracoes": "string - tipos de ilustrações preferidas",
  "aplicacao": "string - como aplica as mensagens",
  "publico_alvo": "string - público que melhor se adapta",
  "pontos_fortes": "array - principais pontos fortes identificados",
  "caracteristicas_unicas": "string - o que torna este pregador único"
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: corpus }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta vazia da OpenAI')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Erro ao criar DNA:', error)
    throw new Error('Falha ao analisar o DNA do pregador')
  }
}

export async function generateSermon(dnaProfile: any, parameters: any, ragContext: string) {
  try {
    const systemPrompt = `Você é um assistente especializado em criação de sermões. Use o DNA do pregador e os parâmetros fornecidos para gerar um sermão personalizado.

DNA do Pregador: ${JSON.stringify(dnaProfile)}

Contexto RAG (base de conhecimento): ${ragContext}

Gere um sermão completo em formato Markdown seguindo a estrutura:
# Título do Sermão
## Introdução
## Desenvolvimento (com pontos principais)
## Conclusão
## Aplicação Prática

Também forneça:
1. Sugestões de enriquecimento (ilustrações, dinâmicas)
2. Autoavaliação da qualidade (nota de 1-10 e justificativa)

Retorne um JSON com:
{
  "titulo": "string",
  "conteudo": "string - sermão completo em Markdown",
  "sugestoes_enriquecimento": "string",
  "autoavaliacao": {
    "nota": number,
    "justificativa": "string"
  }
}`

    const userPrompt = `Parâmetros do sermão:
- Tema: ${parameters.tema}
- Propósito: ${parameters.proposito || 'Não especificado'}
- Público: ${parameters.publico || 'Geral'}
- Duração: ${parameters.duracao || 'Não especificada'}
- Estilo: ${parameters.estilo || 'Livre'}
- Contexto: ${parameters.contexto || 'Não especificado'}
- Conteúdo adicional: ${parameters.conteudo_usuario || 'Nenhum'}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta vazia da OpenAI')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Erro ao gerar sermão:', error)
    throw new Error('Falha ao gerar o sermão')
  }
}

export async function createEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Erro ao criar embedding:', error)
    throw new Error('Falha ao criar embedding')
  }
}

