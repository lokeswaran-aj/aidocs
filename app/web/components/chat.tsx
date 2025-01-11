'use client'

import { useMessageStore } from '@/store/message'
import { ChatBubble } from './chat-bubble'
import ChatMessagePlaceholder from './chat-message-placeholder'
import { ScrollArea } from './ui/scroll-area'

export const Chat = () => {
  const { messages } = useMessageStore()
  return (
    <div className="flex-1 overflow-y-auto pb-[calc(3rem)] sm:pb-0 flex flex-col">
      {messages.length === 0 ? (
        <ChatMessagePlaceholder />
      ) : (
        <>
          <ScrollArea
            type="scroll"
            scrollHideDelay={10}
            className="flex-grow mb-4 mt-4 rounded-md scroll-smooth"
          >
            <div className="max-w-2xl mx-auto">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} />
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  )
}
