import { getThread } from '@/actions/thread'

type Props = { params: Promise<{ thread_id: string }> }

const ThreadPage = async (props: Props) => {
  const thread_id = (await props.params).thread_id
  const thread = await getThread(thread_id)
  return <div>{JSON.stringify(thread)}</div>
}

export default ThreadPage
