import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import DnaManager from '@/components/DnaManager'

export default async function DnaPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <DnaManager />
}

