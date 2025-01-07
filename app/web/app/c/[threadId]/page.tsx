import { getThread } from '@/actions/thread'

type Props = { params: Promise<{ threadId: string }> }

const ThreadPage = async (props: Props) => {
  const threadId = (await props.params).threadId
  const thread = await getThread(threadId)
  return <div>{JSON.stringify(thread)}</div>
}

export default ThreadPage
