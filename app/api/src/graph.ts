import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  RemoveMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { END, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { chatModel } from './openai'
import {
  extendSummarizeConversationPrompt,
  summarizeConversationPrompt,
} from './prompts'
import { AgentState, AgentStateType } from './state'
import { tools } from './tool'

const agent = async (state: AgentStateType) => {
  const { summary } = state

  const llm = chatModel.bindTools(tools)

  let messages: BaseMessage[]
  if (summary && summary.length > 0) {
    messages = [new SystemMessage(summary), ...state.messages]
  } else {
    messages = state.messages
  }

  const response = await llm.invoke(messages)

  return {
    messages: [response],
  }
}

const summarizeConversation = async (state: AgentStateType) => {
  const { summary, messages } = state

  let prompt: string
  if (summary) {
    prompt = await extendSummarizeConversationPrompt.format({ summary })
  } else {
    prompt = summarizeConversationPrompt
  }

  const messagesWithToolMessage = messages.filter(
    (message) =>
      message.getType() !== 'tool' &&
      !(
        'tool_calls' in message &&
        ((message as AIMessage).tool_calls?.length ?? 0) > 0
      )
  )

  const messagesUntilLastConversation = messagesWithToolMessage.slice(0, -2)

  const response = await chatModel.invoke([
    ...messagesUntilLastConversation,
    new HumanMessage(prompt),
  ])

  const newMessages = messages
    .slice(0, -2)
    .map(
      (message, index) =>
        new RemoveMessage({ id: message.id ?? index.toString() })
    )

  return {
    summary: response.content,
    messages: newMessages,
  }
}

const toolNode = new ToolNode(tools)

const nextNode = (
  state: AgentStateType
): 'tools' | 'summarizeConversation' | typeof END => {
  const message = state.messages[state.messages.length - 1]

  if (
    'tool_calls' in message &&
    ((message as AIMessage).tool_calls?.length ?? 0) > 0
  ) {
    return 'tools'
  }

  if (state.messages.length > 6) {
    return 'summarizeConversation'
  }

  return END
}

const builder = new StateGraph(AgentState)
  .addNode('agent', agent)
  .addNode('summarizeConversation', summarizeConversation)
  .addNode('tools', toolNode)

  .addEdge(START, 'agent')
  .addEdge('tools', 'agent')
  .addConditionalEdges('agent', nextNode)
  .addEdge('summarizeConversation', END)

export const graph = builder.compile()
