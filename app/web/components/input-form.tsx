'use client'
import { streamResponse } from '@/actions/stream-response'
import { useMessageStore } from '@/store/message'
import { ROLE } from '@/types/message'
import { generateId } from 'ai'
import { readStreamableValue } from 'ai/rsc'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { AutoResizeTextarea } from './autoresize-input-area'
import { Button } from './ui/button'

export const InputForm = () => {
  const [input, setInput] = useState('')
  const { upsertMessage, threadId, setThreadId } = useMessageStore()
  const handleSubmit = async () => {
    const message = {
      role: ROLE.HUMAN,
      content: input,
      id: generateId(),
    }
    setInput('')
    upsertMessage(message)
    const assistantMessageId = generateId()
    const { value, threadId: newThreadId } = await streamResponse(
      message,
      threadId
    )
    setThreadId(newThreadId)
    for await (const chunk of readStreamableValue(value)) {
      upsertMessage({
        role: ROLE.AI,
        content: chunk ?? '',
        id: assistantMessageId,
      })
    }
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await handleSubmit()
    }
  }
  return (
    <div className="w-full flex justify-center sticky bottom-4">
      <form
        className="flex space-x-2 mb-4 w-full max-w-2xl"
        action={handleSubmit}
      >
        <AutoResizeTextarea
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="Enter a message"
          className="p-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-lg transition-shadow duration-200"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
