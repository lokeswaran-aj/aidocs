'use client'
import { createThread } from '@/actions/thread'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const InputForm = () => {
  const [input, setInput] = useState('')
  return (
    <form action={createThread} className="flex space-x-2">
      <Input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What is server actions in Next.js?"
        className="flex-grow"
        name="input"
      />
      <Button type="submit">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
