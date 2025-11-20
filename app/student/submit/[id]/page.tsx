'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, FileText, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { formatJalali } from '@/lib/jalali'

interface Homework {
  id: string
  title: string
  description: string
  deadline: string
}

export default function SubmitHomework() {
  const router = useRouter()
  const params = useParams()
  const homeworkId = params.id as string

  const [homework, setHomework] = useState<Homework | null>(null)
  const [studentName, setStudentName] = useState('')
  const [studentFamily, setStudentFamily] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('homeworks')
    if (stored) {
      const homeworks = JSON.parse(stored)
      const found = homeworks.find((hw: Homework) => hw.id === homeworkId)
      if (found) {
        setHomework(found)
        const deadline = new Date(found.deadline)
        const now = new Date()
        setIsExpired(now > deadline)
      }
    }
  }, [homeworkId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('فقط فایل PDF مجاز است')
        setPdfFile(null)
        return
      }
      if (file.size > 1 * 1024 * 1024) {
        setError('حجم فایل نباید بیشتر از 1 مگابایت باشد')
        setPdfFile(null)
        return
      }
      setError('')
      setPdfFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isExpired) {
      setError('مهلت ارسال تکلیف به پایان رسیده است')
      return
    }
    
    if (!pdfFile) {
      setError('لطفا فایل PDF را انتخاب کنید')
      return
    }

    setLoading(true)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string

      const submission = {
        id: Date.now().toString(),
        homeworkId,
        studentName,
        studentFamily,
        fileName: pdfFile.name,
        fileData: base64,
        submittedAt: new Date().toISOString()
      }

      const stored = localStorage.getItem('submissions')
      const submissions = stored ? JSON.parse(stored) : []
      submissions.push(submission)
      localStorage.setItem('submissions', JSON.stringify(submissions))

      setTimeout(() => {
        setLoading(false)
        router.push('/student')
      }, 500)
    }

    reader.readAsDataURL(pdfFile)
  }

  if (!homework) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">تکلیف مورد نظر یافت نشد</p>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/student">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ارسال جواب تکلیف</h1>
        </div>

        {isExpired && (
          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-bold text-red-600">مهلت ارسال به پایان رسیده است</p>
                <p className="text-sm text-red-600">امکان ارسال تکلیف وجود ندارد</p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <div className="space-y-2 mb-6 pb-6 border-b">
            <h2 className="text-2xl font-bold">{homework.title}</h2>
            <p className="text-muted-foreground">{homework.description}</p>
            <p className="text-sm text-muted-foreground">
              مهلت ارسال: {formatJalali(new Date(homework.deadline), true)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <Input
                  id="name"
                  placeholder="نام خود را وارد کنید"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  disabled={isExpired}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="family">نام خانوادگی</Label>
                <Input
                  id="family"
                  placeholder="نام خانوادگی خود را وارد کنید"
                  value={studentFamily}
                  onChange={(e) => setStudentFamily(e.target.value)}
                  required
                  disabled={isExpired}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf">فایل PDF جواب</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                  disabled={isExpired}
                />
                <label htmlFor="pdf" className={isExpired ? 'cursor-not-allowed' : 'cursor-pointer'}>
                  <div className="flex flex-col items-center gap-3">
                    {pdfFile ? (
                      <>
                        <FileText className="w-12 h-12 text-green-600" />
                        <div>
                          <p className="font-medium text-green-600">{pdfFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(pdfFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <div>
                          <p className="font-medium">کلیک کنید یا فایل را بکشید</p>
                          <p className="text-sm text-muted-foreground">فقط فایل PDF (حداکثر 1MB)</p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex gap-3">
              <Button type="submit" size="lg" disabled={loading || isExpired} className="flex-1">
                {loading ? 'در حال ارسال...' : 'ارسال جواب'}
              </Button>
              <Link href="/student">
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
