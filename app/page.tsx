"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const LandingPage = () => {
  const user = useAppSelector(state => state.user.user)
  const router = useRouter()

  useEffect(() => {
    if (!user || user.length === 0) {
      router.push('/signup')
    }
  }, [user, router])

  return (
    <div>
      {/* Your landing page content */}
    </div>
  )
}

export default LandingPage