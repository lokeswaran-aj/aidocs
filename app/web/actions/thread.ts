'use server'
import { assistant, langGraphClient } from '@/clients/langgraph'
import { redirect } from 'next/navigation'

export const createThread = async (formData: FormData) => {
  const input = formData.get('input')
  if (!input) return
  const thread = await langGraphClient.threads.create()
  const messages = [{ role: 'human', content: input }]
  await langGraphClient.runs.create(thread.thread_id, assistant.assistant_id, {
    input: { messages },
  })
  redirect(`/c/${thread.thread_id}`)
}

export const getThread = async (threadId: string) => {
  return await langGraphClient.threads.get(threadId)
}
