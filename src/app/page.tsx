import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import LandingPage from '@/components/LandingPage'

export default async function Home() {
  const { userId } = auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  return <LandingPage />
}


