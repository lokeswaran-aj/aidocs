import { PromptTemplate } from '@langchain/core/prompts'

export const summarizeConversationPrompt =
  'Create a summary of the conversation above'

export const extendSummarizeConversationPrompt = PromptTemplate.fromTemplate(
  `This is a summary of the conversation to date: {summary}\n\n` +
    'Extend the summary by taking into account the new messages above'
)
