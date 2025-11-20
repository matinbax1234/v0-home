'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DEFAULT_PASSWORD = 'Teacher2024@'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      const storedPassword = localStorage.getItem('teacherPassword') || DEFAULT_PASSWORD
      
      if (password === storedPassword) {
        localStorage.setItem('teacherLoggedIn', 'true')
        router.push('/teacher')
      } else {
        setError('رمز عبور اشتباه است')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <img 
        src="/abstract-geometric-pattern-with-books-and-code-sym.jpg" 
        alt="Background Pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      
      <Card className="w-full max-w-md p-8 relative z-10 shadow-2xl border-2">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ورود به پنل معلم
            </h1>
            <p className="text-muted-foreground">
              لطفاً رمز عبور خود را وارد کنید
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                placeholder="رمز عبور را وارد کنید"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-lg"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'در حال ورود...' : 'ورود'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border">
            <p className="font-medium">رمز عبور پیش‌فرض:</p>
            <code className="font-mono text-blue-600 font-bold">Teacher2024@</code>
          </div>
        </div>
      </Card>
    </main>
  )
}
