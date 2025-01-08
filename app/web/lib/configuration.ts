export const configuration = {
  langgraphApiUrl:
    process.env.NEXT_PUBLIC_LANGGRAPH_API_URL || 'http://localhost:8001',
  langgraphId: 'agent',
  assistantName: 'assistant',
}

export type ConfigurationType = typeof configuration
