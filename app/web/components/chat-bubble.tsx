import { Message } from '@/types/message'
import { Markdown } from './markdown'

type Props = {
  message: Message
}

export const ChatBubble = (props: Props) => {
  const { message } = props
  return (
    <div
      key={message.id}
      className={`mb-4 ${
        message.role === 'human' ? 'text-right' : 'text-left'
      }`}
    >
      <div
        className={`inline-block p-2 rounded-lg ${
          message.role === 'human'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        <Markdown>{message.content as string}</Markdown>
      </div>
    </div>
  )
}
