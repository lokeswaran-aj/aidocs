import { create } from 'zustand'
import { MessageStore } from '../types/message'

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  threadId: undefined,
  upsertMessage: (message) =>
    set((state) => ({
      messages: state.messages.some((m) => m.id === message.id)
        ? state.messages.map((m) => (m.id === message.id ? message : m))
        : [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
  setThreadId: (threadId) => set({ threadId }),
}))
