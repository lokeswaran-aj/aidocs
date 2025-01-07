export const configuration = {
  langgraphApiUrl: process.env.LANGGRAPH_API_URL || 'http://localhost:8001',
  langgraphId: 'agent',
  assistantName: 'assistant',
}

export type ConfigurationType = typeof configuration
