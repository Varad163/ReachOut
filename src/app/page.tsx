
// src/app/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import LandingPage from '@/components/landing/LandingPage'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // 1️⃣ Guest → landing
  if (!session?.user?.email) {
    return <LandingPage />
  }

  // 2️⃣ Logged in → check profile
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      resumeText: true,
      smtpEmail: true
    }
  })

  // 3️⃣ Profile incomplete → force setup
  if (!user?.resumeText || !user?.smtpEmail) {
    redirect('/profile')
  }

  // 4️⃣ Fully ready → workspace
  redirect('/workspace')
}