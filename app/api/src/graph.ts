import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph'
import { ToolNode, toolsCondition } from '@langchain/langgraph/prebuilt'
import { chatModel } from './openai'
import { tools } from './tool'

const agent = async (state: typeof MessagesAnnotation.State) => {
  const { messages } = state

  const llm = chatModel.bindTools(tools)

  const response = await llm.invoke(messages)

  return {
    messages: [response],
  }
}

const toolNode = new ToolNode(tools)

const builder = new StateGraph(MessagesAnnotation)
  .addNode('agent', agent)
  .addEdge(START, 'agent')
  .addNode('tools', toolNode)
  .addEdge('tools', 'agent')
  .addConditionalEdges('agent', toolsCondition, ['tools', END])

export const graph = builder.compile()
