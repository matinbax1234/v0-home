'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toGregorian } from '@/lib/jalali'

export default function CreateHomework() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [jalaliYear, setJalaliYear] = useState('')
  const [jalaliMonth, setJalaliMonth] = useState('')
  const [jalaliDay, setJalaliDay] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('teacherLoggedIn')
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const gregorianDate = toGregorian(
      parseInt(jalaliYear),
      parseInt(jalaliMonth),
      parseInt(jalaliDay)
    )
    gregorianDate.setHours(parseInt(hour), parseInt(minute), 0, 0)

    const newHomework = {
      id: Date.now().toString(),
      title,
      description,
      deadline: gregorianDate.toISOString(),
      createdAt: new Date().toISOString()
    }

    const stored = localStorage.getItem('homeworks')
    const homeworks = stored ? JSON.parse(stored) : []
    homeworks.push(newHomework)
    localStorage.setItem('homeworks', JSON.stringify(homeworks))

    setTimeout(() => {
      setLoading(false)
      router.push('/teacher')
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ایجاد تکلیف جدید</h1>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان تکلیف</Label>
              <Input
                id="title"
                placeholder="مثال: تمرین برنامه‌نویسی جاوا"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات تکلیف</Label>
              <Textarea
                id="description"
                placeholder="جزئیات و توضیحات کامل تکلیف را بنویسید..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="space-y-4">
              <Label>مهلت ارسال (تاریخ شمسی)</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm">سال</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="1403"
                    min="1400"
                    max="1450"
                    value={jalaliYear}
                    onChange={(e) => setJalaliYear(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month" className="text-sm">ماه</Label>
                  <Input
                    id="month"
                    type="number"
                    placeholder="9"
                    min="1"
                    max="12"
                    value={jalaliMonth}
                    onChange={(e) => setJalaliMonth(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day" className="text-sm">روز</Label>
                  <Input
                    id="day"
                    type="number"
                    placeholder="27"
                    min="1"
                    max="31"
                    value={jalaliDay}
                    onChange={(e) => setJalaliDay(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Label>ساعت</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="hour" className="text-sm">ساعت</Label>
                  <Input
                    id="hour"
                    type="number"
                    placeholder="23"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minute" className="text-sm">دقیقه</Label>
                  <Input
                    id="minute"
                    type="number"
                    placeholder="59"
                    min="0"
                    max="59"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" size="lg" disabled={loading} className="flex-1">
                {loading ? 'در حال ذخیره...' : 'ایجاد تکلیف'}
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
