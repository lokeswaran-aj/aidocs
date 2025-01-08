'use server'

import { assistant, langGraphClient } from '@/clients/langgraph'
import { Message } from '@/types/message'
import { createStreamableValue } from 'ai/rsc'

export const streamResponse = async (message: Message, threadId?: string) => {
  if (!threadId) {
    const thread = await langGraphClient.threads.create()
    threadId = thread.thread_id
  }
  const stream = createStreamableValue('')

  ;(async () => {
    const streamResponse = langGraphClient.runs.stream(
      threadId,
      assistant.assistant_id,
      {
        input: { messages: [message] },
        streamMode: 'events',
      }
    )
    let textContent = ''
    for await (const chunk of streamResponse) {
      if (chunk.data.data?.chunk) {
        if (chunk.data.event === 'on_chat_model_stream') {
          const messageContent = chunk.data.data.chunk[1]?.content
          textContent = textContent + messageContent
        }
        if (chunk.data.event === 'on_tool_start') {
          textContent = 'Calling tool...'
        }
        if (chunk.data.event === 'on_tool_end') {
          textContent = ''
        }
        stream.update(textContent)
      }
    }
    stream.done()
  })()

  return { value: stream.value, threadId }
}
