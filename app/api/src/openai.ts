import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { configuration } from './configuration'
import { LLM_TEMPERATURE } from './constants'

export const embeddings = new OpenAIEmbeddings({
  model: configuration.openai.embeddingsModel,
})

export const chatModel = new ChatOpenAI({
  model: configuration.openai.llmModel,
  temperature: LLM_TEMPERATURE,
  streaming: true,
})
