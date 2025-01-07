import { InputForm } from '@/components/input-form'
export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          What do you want to know?
        </h1>
        <InputForm />
      </div>
    </main>
  )
}
