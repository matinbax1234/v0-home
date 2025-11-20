'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Homework {
  id: string
  title: string
  description: string
  deadline: string
}

interface Submission {
  homeworkId: string
  studentName: string
  studentFamily: string
}

export default function StudentDashboard() {
  const [homeworks, setHomeworks] = useState<Homework[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    const storedHomeworks = localStorage.getItem('homeworks')
    if (storedHomeworks) {
      setHomeworks(JSON.parse(storedHomeworks))
    }

    const storedSubmissions = localStorage.getItem('submissions')
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions))
    }
  }, [])

  const isSubmitted = (homeworkId: string) => {
    return submissions.some(sub => sub.homeworkId === homeworkId)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">پنل دانش‌آموز</h1>
        </div>

        <div className="grid gap-4">
          {homeworks.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                هنوز تکلیفی تعیین نشده است
              </p>
            </Card>
          ) : (
            homeworks.map((homework) => {
              const submitted = isSubmitted(homework.id)
              return (
                <Card key={homework.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{homework.title}</h3>
                        {submitted && (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            ارسال شده
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{homework.description}</p>
                      <p className="text-sm text-muted-foreground">
                        مهلت ارسال: {new Date(homework.deadline).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                    <Link href={`/student/submit/${homework.id}`}>
                      <Button disabled={submitted}>
                        <Upload className="w-4 h-4 ml-2" />
                        {submitted ? 'ارسال شده' : 'ارسال جواب'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
