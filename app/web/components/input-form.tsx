'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const InputForm = () => {
  const [input, setInput] = useState('')
  return (
    <form className="flex space-x-2">
      <Input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What is server actions in Next.js?"
        className="flex-grow"
      />
      <Button type="submit">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
