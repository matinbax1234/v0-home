'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/futuristic-digital-education-technology-background.jpg" 
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl w-full space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/modern-3d-programming-homework-assignment-icon-wit.jpg"
              alt="Logo"
              className="w-40 h-40 drop-shadow-2xl animate-float"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-balance text-white drop-shadow-lg">
            سیستم مدیریت تکالیف
          </h1>
          <p className="text-xl md:text-2xl text-white/90 text-pretty font-medium drop-shadow-md">
            پلتفرم پیشرفته برای مدیریت تکالیف کلاس برنامه‌نویسی
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-10 hover:shadow-2xl transition-all cursor-pointer group border-4 border-white/20 hover:border-white hover:scale-105 bg-white/95 backdrop-blur-sm" onClick={() => router.push('/login')}>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="/3d-teacher-with-graduation-cap-and-tablet-teaching.jpg"
                  alt="Teacher"
                  className="w-32 h-32 relative z-10 drop-shadow-xl"
                />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                پنل معلم
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ایجاد و مدیریت تکالیف، تعیین زمان ارسال و بررسی جواب‌های دانش‌آموزان
              </p>
              <Button className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg">
                ورود به پنل معلم
              </Button>
            </div>
          </Card>

          <Card className="p-10 hover:shadow-2xl transition-all cursor-pointer group border-4 border-white/20 hover:border-white hover:scale-105 bg-white/95 backdrop-blur-sm" onClick={() => router.push('/student')}>
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="/3d-student-with-backpack-holding-books-and-laptop-.jpg"
                  alt="Student"
                  className="w-32 h-32 relative z-10 drop-shadow-xl"
                />
              </div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                پنل دانش‌آموز
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                مشاهده تکالیف درسی و ارسال جواب به صورت فایل PDF
              </p>
              <Button className="w-full text-lg py-6 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700" size="lg">
                ورود به پنل دانش‌آموز
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
