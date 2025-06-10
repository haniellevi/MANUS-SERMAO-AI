import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SermonGenerator from '@/components/SermonGenerator'

export default async function NewSermonPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <SermonGenerator />
}

