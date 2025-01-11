import { cn } from '@/lib/utils'
import { Message } from '@/types/message'
import Image from 'next/image'
import { Markdown } from './markdown'

type Props = {
  message: Message
}

export const ChatBubble = (props: Props) => {
  const { message } = props
  const isAI = message.role === 'ai'
  return (
    <div key={message.id}>
      <div
        className={cn(
          'flex items-start gap-1 p-2 text-sm sm:text-base',
          isAI ? 'justify-start' : 'justify-end py-3'
        )}
      >
        {isAI && (
          <Image
            src="/star.svg"
            alt="AI Assistant"
            width={40}
            height={40}
            className="select-none relative p-0.5 sm:p-1.5 mt-1.5 sm:mt-0 rounded-full flex items-center justify-center w-5 h-5 sm:w-10 sm:h-10"
          />
        )}
        <div
          className={cn(
            'inline-block',
            isAI
              ? 'mt-2'
              : 'bg-blue-500 text-white rounded-full px-2 py-1 sm:px-4 sm:py-2'
          )}
        >
          <Markdown>{message.content as string}</Markdown>
        </div>
      </div>
    </div>
  )
}
