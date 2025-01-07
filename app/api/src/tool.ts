import { createRetrieverTool } from 'langchain/tools/retriever'
import { TOP_K_EMBEDDING_TO_BE_RETRIEVED } from './constants'
import { getVectorStore } from './vectorstore'

const vectorStore = await getVectorStore()

const retriever = vectorStore.asRetriever({
  k: TOP_K_EMBEDDING_TO_BE_RETRIEVED,
})

const retrieverTool = createRetrieverTool(retriever, {
  name: 'nextjs_documentation_retriever',
  description:
    'This tool is designed to search and return detailed information about Next.js documentation, including tutorials, code examples, guides, and API references.',
})

export const tools = [retrieverTool]
