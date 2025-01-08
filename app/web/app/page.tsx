import { Chat } from '@/components/chat'
import { InputForm } from '@/components/input-form'

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full px-4">
      <Chat />
      <InputForm />
    </div>
  )
}
