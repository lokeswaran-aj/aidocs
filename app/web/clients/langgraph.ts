import { configuration } from '@/lib/configuration'
import { Client } from '@langchain/langgraph-sdk'

export const langGraphClient = new Client({
  apiUrl: configuration.langgraphApiUrl,
})

export const assistant = await langGraphClient.assistants.create({
  graphId: configuration.langgraphId,
  name: configuration.assistantName,
})
