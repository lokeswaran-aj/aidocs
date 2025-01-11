import { Chat } from '@/components/chat'
import { InputForm } from '@/components/input-form'

export default function Home() {
  return (
    <div className="flex flex-col h-dvh w-full">
      <Chat />
      <InputForm />
    </div>
  )
}
