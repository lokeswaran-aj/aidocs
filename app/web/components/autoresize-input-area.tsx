'use client'

import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes, useEffect, useRef } from 'react'

import { Textarea } from '@/components/ui/textarea'

interface AutoResizeTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {
  value: string
  onChange: (value: string) => void
}

export function AutoResizeTextarea({
  className,
  value,
  onChange,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [value])

  return (
    <Textarea
      {...props}
      value={value}
      ref={textareaRef}
      rows={1}
      onChange={(e) => {
        onChange(e.target.value)
        resizeTextarea()
      }}
      className={cn(
        'resize-none min-h-[40px] max-h-[200px] sm:min-h-[44px]',
        'py-2 px-3 sm:py-3 sm:px-4',
        className
      )}
    />
  )
}
