'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, User, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Homework {
  id: string
  title: string
  description: string
  deadline: string
}

interface Submission {
  id: string
  homeworkId: string
  studentName: string
  studentFamily: string
  fileName: string
  fileData: string
  submittedAt: string
}

export default function ViewSubmissions() {
  const params = useParams()
  const homeworkId = params.id as string

  const [homework, setHomework] = useState<Homework | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    const storedHomeworks = localStorage.getItem('homeworks')
    if (storedHomeworks) {
      const homeworks = JSON.parse(storedHomeworks)
      const found = homeworks.find((hw: Homework) => hw.id === homeworkId)
      setHomework(found || null)
    }

    const storedSubmissions = localStorage.getItem('submissions')
    if (storedSubmissions) {
      const allSubmissions = JSON.parse(storedSubmissions)
      const filtered = allSubmissions.filter(
        (sub: Submission) => sub.homeworkId === homeworkId
      )
      setSubmissions(filtered)
    }
  }, [homeworkId])

  const handleDownload = (submission: Submission) => {
    const link = document.createElement('a')
    link.href = submission.fileData
    link.download = `${submission.studentName}_${submission.studentFamily}_${submission.fileName}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!homework) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">تکلیف مورد نظر یافت نشد</p>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/teacher">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">جواب‌های ارسال شده</h1>
            <p className="text-muted-foreground mt-1">{homework.title}</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-2 mb-6 pb-6 border-b">
            <h2 className="text-xl font-bold">{homework.title}</h2>
            <p className="text-muted-foreground">{homework.description}</p>
            <p className="text-sm text-muted-foreground">
              مهلت ارسال: {new Date(homework.deadline).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-sm font-medium mt-2">
              تعداد جواب‌های دریافت شده: {submissions.length}
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                هنوز جوابی ارسال نشده است
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-bold">
                          {submission.studentName} {submission.studentFamily}
                        </h3>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              زمان ارسال: {new Date(submission.submittedAt).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p>نام فایل: {submission.fileName}</p>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleDownload(submission)} size="lg">
                      <Download className="w-4 h-4 ml-2" />
                      دانلود PDF
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}
