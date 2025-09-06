import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { MapPin, Navigation, Volume2, VolumeX, Settings, Clock } from 'lucide-react'

const PrayerTimesSection = () => {
  const [location, setLocation] = useState(null)
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [nextPrayer, setNextPrayer] = useState(null)
  const [qiblaDirection, setQiblaDirection] = useState(null)
  const [adhanEnabled, setAdhanEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock prayer times data
  const mockPrayerTimes = {
    fajr: '05:30',
    sunrise: '06:45',
    dhuhr: '12:15',
    asr: '15:30',
    maghrib: '18:00',
    isha: '19:30'
  }

  const prayerNames = {
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء'
  }

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Load saved settings
    const savedLocation = localStorage.getItem('userLocation')
    const savedAdhanSetting = localStorage.getItem('adhanEnabled')
    
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation))
    }
    if (savedAdhanSetting !== null) {
      setAdhanEnabled(JSON.parse(savedAdhanSetting))
    }

    // Set mock data for demo
    setPrayerTimes(mockPrayerTimes)
    setQiblaDirection(45) // Mock qibla direction

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (prayerTimes) {
      calculateNextPrayer()
    }
  }, [prayerTimes, currentTime])

  useEffect(() => {
    localStorage.setItem('adhanEnabled', JSON.stringify(adhanEnabled))
  }, [adhanEnabled])

  const getCurrentLocation = () => {
    setLoading(true)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'الموقع الحالي' // This would be fetched from a geocoding API
          }
          setLocation(newLocation)
          localStorage.setItem('userLocation', JSON.stringify(newLocation))
          
          // In a real app, you would fetch prayer times from an API here
          fetchPrayerTimes(newLocation)
          setLoading(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLoading(false)
          // Use default location or show error
          setLocation({
            latitude: 24.7136,
            longitude: 46.6753,
            city: 'الرياض'
          })
        }
      )
    } else {
      setLoading(false)
      alert('الموقع الجغرافي غير مدعوم في هذا المتصفح')
    }
  }

  const fetchPrayerTimes = async (location) => {
    try {
      // In a real app, you would call the Aladhan API here
      // const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${location.latitude}&longitude=${location.longitude}&method=4`)
      // const data = await response.json()
      
      // For demo, we'll use mock data
      setPrayerTimes(mockPrayerTimes)
      calculateQiblaDirection(location)
    } catch (error) {
      console.error('Error fetching prayer times:', error)
    }
  }

  const calculateQiblaDirection = (location) => {
    // Simplified qibla calculation (in a real app, use proper calculation)
    const kaaba = { lat: 21.4225, lng: 39.8262 }
    const userLat = location.latitude * Math.PI / 180
    const userLng = location.longitude * Math.PI / 180
    const kaabaLat = kaaba.lat * Math.PI / 180
    const kaabaLng = kaaba.lng * Math.PI / 180
    
    const dLng = kaabaLng - userLng
    const y = Math.sin(dLng) * Math.cos(kaabaLat)
    const x = Math.cos(userLat) * Math.sin(kaabaLat) - Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(dLng)
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI
    bearing = (bearing + 360) % 360
    
    setQiblaDirection(Math.round(bearing))
  }

  const calculateNextPrayer = () => {
    if (!prayerTimes) return

    const now = new Date()
    const currentTimeStr = now.toTimeString().slice(0, 5)
    
    const prayers = [
      { name: 'fajr', time: prayerTimes.fajr, displayName: 'الفجر' },
      { name: 'dhuhr', time: prayerTimes.dhuhr, displayName: 'الظهر' },
      { name: 'asr', time: prayerTimes.asr, displayName: 'العصر' },
      { name: 'maghrib', time: prayerTimes.maghrib, displayName: 'المغرب' },
      { name: 'isha', time: prayerTimes.isha, displayName: 'العشاء' }
    ]

    for (let prayer of prayers) {
      if (prayer.time > currentTimeStr) {
        const timeRemaining = calculateTimeRemaining(prayer.time)
        setNextPrayer({
          ...prayer,
          timeRemaining
        })
        return
      }
    }

    // If no prayer found for today, next prayer is Fajr tomorrow
    const timeRemaining = calculateTimeRemaining(prayers[0].time, true)
    setNextPrayer({
      ...prayers[0],
      timeRemaining
    })
  }

  const calculateTimeRemaining = (prayerTime, nextDay = false) => {
    const now = new Date()
    const [hours, minutes] = prayerTime.split(':').map(Number)
    
    const prayerDate = new Date()
    prayerDate.setHours(hours, minutes, 0, 0)
    
    if (nextDay) {
      prayerDate.setDate(prayerDate.getDate() + 1)
    }
    
    const diff = prayerDate - now
    const hoursRemaining = Math.floor(diff / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hoursRemaining}:${minutesRemaining.toString().padStart(2, '0')}`
  }

  const playAdhan = () => {
    if (adhanEnabled) {
      // In a real app, you would play an actual adhan audio file
      new Notification('حان وقت الصلاة', {
        body: `حان وقت صلاة ${nextPrayer?.displayName}`,
        icon: '/icon-192x192.png'
      })
      
      // Create a simple tone for demo
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 440
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 2)
    }
  }

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <section id="prayer-times" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            أوقات الصلاة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            أوقات الصلاة الدقيقة بناءً على موقعك مع الأذان واتجاه القبلة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Next Prayer */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center">الصلاة القادمة</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {nextPrayer ? (
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {nextPrayer.displayName}
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {formatTime(nextPrayer.time)}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      متبقي: {nextPrayer.timeRemaining}
                    </p>
                    <Button
                      onClick={playAdhan}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!adhanEnabled}
                    >
                      تشغيل الأذان
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">جاري تحديد الصلاة القادمة...</p>
                )}
              </CardContent>
            </Card>

            {/* Prayer Times Table */}
            <Card>
              <CardHeader>
                <CardTitle>أوقات الصلاة اليوم</CardTitle>
              </CardHeader>
              <CardContent>
                {prayerTimes ? (
                  <div className="space-y-3">
                    {Object.entries(prayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-3 h-3 rounded-full ${
                            nextPrayer?.name === prayer ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="font-semibold">{prayerNames[prayer]}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-lg font-mono">{formatTime(time)}</span>
                          {prayer !== 'sunrise' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (adhanEnabled) {
                                  new Notification(`تذكير صلاة ${prayerNames[prayer]}`, {
                                    body: `حان وقت صلاة ${prayerNames[prayer]}`,
                                    icon: '/icon-192x192.png'
                                  })
                                }
                              }}
                              className="p-1"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">جاري تحميل أوقات الصلاة...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  الموقع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {location ? location.city : 'لم يتم تحديد الموقع'}
                  </p>
                  <Button
                    onClick={getCurrentLocation}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'جاري التحديد...' : 'تحديد الموقع'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Qibla Direction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  اتجاه القبلة
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {qiblaDirection !== null ? (
                  <div className="space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="w-32 h-32 border-4 border-green-500 rounded-full relative">
                        <div 
                          className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-red-500"
                          style={{ transformOrigin: 'bottom', transform: `translateX(-50%) rotate(${qiblaDirection}deg)` }}
                        ></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {qiblaDirection}° شمال شرق
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        اتجاه الكعبة المشرفة
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    حدد موقعك لمعرفة اتجاه القبلة
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  الإعدادات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">الأذان</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAdhanEnabled(!adhanEnabled)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse ${
                      adhanEnabled ? 'bg-green-100 dark:bg-green-900' : ''
                    }`}
                  >
                    {adhanEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span>{adhanEnabled ? 'مفعل' : 'معطل'}</span>
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>طريقة الحساب: أم القرى</p>
                  <p>المذهب: حنفي</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrayerTimesSection

