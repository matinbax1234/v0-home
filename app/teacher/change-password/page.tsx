'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const DEFAULT_PASSWORD = 'Teacher2024@'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('teacherLoggedIn')
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    setTimeout(() => {
      const storedPassword = localStorage.getItem('teacherPassword') || DEFAULT_PASSWORD

      if (currentPassword !== storedPassword) {
        setError('رمز عبور فعلی اشتباه است')
        setLoading(false)
        return
      }

      if (newPassword.length < 8) {
        setError('رمز عبور جدید باید حداقل 8 کاراکتر باشد')
        setLoading(false)
        return
      }

      if (newPassword !== confirmPassword) {
        setError('رمز عبور جدید و تکرار آن یکسان نیستند')
        setLoading(false)
        return
      }

      localStorage.setItem('teacherPassword', newPassword)
      setSuccess(true)
      setLoading(false)
      
      setTimeout(() => {
        router.push('/teacher')
      }, 2000)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">تغییر رمز عبور</h1>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current">رمز عبور فعلی</Label>
              <Input
                id="current"
                type="password"
                placeholder="رمز عبور فعلی را وارد کنید"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new">رمز عبور جدید</Label>
              <Input
                id="new"
                type="password"
                placeholder="رمز عبور جدید را وارد کنید"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">تکرار رمز عبور جدید</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="رمز عبور جدید را دوباره وارد کنید"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-600">رمز عبور با موفقیت تغییر کرد!</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" size="lg" disabled={loading} className="flex-1">
                {loading ? 'در حال ذخیره...' : 'تغییر رمز عبور'}
              </Button>
              <Link href="/teacher">
                <Button type="button" variant="outline" size="lg">
                  انصراف
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}
