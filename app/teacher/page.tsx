"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, LogOut, KeyRound, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { formatJalali } from "@/lib/jalali"

interface Homework {
  id: string
  title: string
  description: string
  deadline: string
  createdAt: string
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [homeworks, setHomeworks] = useState<Homework[]>([])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("teacherLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const stored = localStorage.getItem("homeworks")
    if (stored) {
      setHomeworks(JSON.parse(stored))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("teacherLoggedIn")
    router.push("/")
  }

  const handleChangePassword = () => {
    router.push("/teacher/change-password")
  }

  const handleDelete = (homeworkId: string) => {
    if (confirm("آیا مطمئن هستید که می‌خواهید این تکلیف را حذف کنید?")) {
      const updatedHomeworks = homeworks.filter((hw) => hw.id !== homeworkId)
      setHomeworks(updatedHomeworks)
      localStorage.setItem("homeworks", JSON.stringify(updatedHomeworks))

      // Also delete related submissions
      const storedSubmissions = localStorage.getItem("submissions")
      if (storedSubmissions) {
        const allSubmissions = JSON.parse(storedSubmissions)
        const filteredSubmissions = allSubmissions.filter((sub: any) => sub.homeworkId !== homeworkId)
        localStorage.setItem("submissions", JSON.stringify(filteredSubmissions))
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="/abstract-geometric-pattern-with-books-and-code-sym.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">پنل معلم</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="lg" onClick={handleChangePassword}>
              <KeyRound className="w-5 h-5 ml-2" />
              تغییر رمز عبور
            </Button>
            <Button variant="outline" size="lg" onClick={handleLogout}>
              <LogOut className="w-5 h-5 ml-2" />
              خروج
            </Button>
            <Link href="/teacher/create">
              <Button size="lg">ایجاد تکلیف جدید</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {homeworks.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">هنوز تکلیفی ایجاد نشده است</p>
            </Card>
          ) : (
            homeworks.map((homework) => (
              <Card key={homework.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold">{homework.title}</h3>
                    <p className="text-muted-foreground">{homework.description}</p>
                    <p className="text-sm text-muted-foreground">
                      مهلت ارسال: {formatJalali(new Date(homework.deadline), true)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/teacher/submissions/${homework.id}`}>
                      <Button>مشاهده جواب‌ها</Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(homework.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
