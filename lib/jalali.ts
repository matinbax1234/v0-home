export function toJalali(date: Date): { year: number; month: number; day: number } {
  let gy = date.getFullYear()
  const gm = date.getMonth() + 1
  const gd = date.getDate()
  
  let jy: number, jm: number, jd: number
  
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  
  if (gy > 1600) {
    jy = 979
    gy -= 1600
  } else {
    jy = 0
    gy -= 621
  }
  
  const gy2 = (gm > 2) ? (gy + 1) : gy
  let days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + 
             (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1]
  jy += 33 * Math.floor(days / 12053)
  days %= 12053
  jy += 4 * Math.floor(days / 1461)
  days %= 1461
  
  if (days > 365) {
    jy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }
  
  if (days < 186) {
    jm = 1 + Math.floor(days / 31)
    jd = 1 + (days % 31)
  } else {
    jm = 7 + Math.floor((days - 186) / 30)
    jd = 1 + ((days - 186) % 30)
  }
  
  return { year: jy, month: jm, day: jd }
}

export function toGregorian(jy: number, jm: number, jd: number): Date {
  let gy: number, gm: number, gd: number
  
  if (jy > 979) {
    gy = 1600
    jy -= 979
  } else {
    gy = 621
  }
  
  let days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd
  
  if (jm < 7) {
    days += (jm - 1) * 31
  } else {
    days += ((jm - 7) * 30) + 186
  }
  
  gy += 400 * Math.floor(days / 146097)
  days %= 146097
  
  let leap = true
  if (days >= 36525) {
    days--
    gy += 100 * Math.floor(days / 36524)
    days %= 36524
    if (days >= 365) days++
    else leap = false
  }
  
  gy += 4 * Math.floor(days / 1461)
  days %= 1461
  
  if (days >= 366) {
    leap = false
    days--
    gy += Math.floor(days / 365)
    days %= 365
  }
  
  const sal_a = [0, 31, ((leap ? 29 : 28)), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  gm = 0
  while (gm < 13 && days >= sal_a[gm]) {
    days -= sal_a[gm]
    gm++
  }
  gd = days + 1
  
  return new Date(gy, gm - 1, gd)
}

export function formatJalali(date: Date, includeTime = false): string {
  const j = toJalali(date)
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ]
  
  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${j.day} ${monthNames[j.month - 1]} ${j.year} - ساعت ${hours}:${minutes}`
  }
  
  return `${j.day} ${monthNames[j.month - 1]} ${j.year}`
}
