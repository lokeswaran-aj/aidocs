import { Annotation, MessagesAnnotation } from '@langchain/langgraph'
export const AgentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  summary: Annotation<string>,
})

export type AgentStateType = typeof AgentState.State
