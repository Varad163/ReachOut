import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user?.email === 'varadgholap163@gmail.com'
}
