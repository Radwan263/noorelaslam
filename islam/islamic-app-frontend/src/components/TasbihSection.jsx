import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { RotateCcw, Plus, Minus, Settings, Volume2, VolumeX } from 'lucide-react'

const TasbihSection = () => {
  const [count, setCount] = useState(0)
  const [target, setTarget] = useState(33)
  const [currentTasbih, setCurrentTasbih] = useState('سبحان الله')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [history, setHistory] = useState([])

  const tasbihOptions = [
    { text: 'سبحان الله', target: 33 },
    { text: 'الحمد لله', target: 33 },
    { text: 'الله أكبر', target: 34 },
    { text: 'لا إله إلا الله', target: 100 },
    { text: 'استغفر الله', target: 100 },
    { text: 'لا حول ولا قوة إلا بالله', target: 100 },
    { text: 'سبحان الله وبحمده', target: 100 },
    { text: 'سبحان الله العظيم', target: 100 }
  ]

  useEffect(() => {
    // Load saved data from localStorage
    const savedCount = localStorage.getItem('tasbihCount')
    const savedTarget = localStorage.getItem('tasbihTarget')
    const savedTasbih = localStorage.getItem('currentTasbih')
    const savedHistory = localStorage.getItem('tasbihHistory')
    
    if (savedCount) setCount(parseInt(savedCount))
    if (savedTarget) setTarget(parseInt(savedTarget))
    if (savedTasbih) setCurrentTasbih(savedTasbih)
    if (savedHistory) setHistory(JSON.parse(savedHistory))
  }, [])

  useEffect(() => {
    // Save to localStorage whenever state changes
    localStorage.setItem('tasbihCount', count.toString())
    localStorage.setItem('tasbihTarget', target.toString())
    localStorage.setItem('currentTasbih', currentTasbih)
    localStorage.setItem('tasbihHistory', JSON.stringify(history))
  }, [count, target, currentTasbih, history])

  const playSound = () => {
    if (soundEnabled) {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  const vibrate = () => {
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const incrementCount = () => {
    const newCount = count + 1
    setCount(newCount)
    playSound()
    vibrate()

    // Check if target reached
    if (newCount === target) {
      const completedSession = {
        tasbih: currentTasbih,
        count: newCount,
        target: target,
        completedAt: new Date().toISOString(),
        duration: Date.now() // This would be calculated properly in a real app
      }
      setHistory([completedSession, ...history.slice(0, 9)]) // Keep last 10 sessions
      
      // Show completion notification
      if (Notification.permission === 'granted') {
        new Notification('تم إكمال التسبيح!', {
          body: `تم إكمال ${target} من ${currentTasbih}`,
          icon: '/icon-192x192.png'
        })
      }
    }
  }

  const resetCount = () => {
    setCount(0)
  }

  const changeTasbih = (tasbihOption) => {
    setCurrentTasbih(tasbihOption.text)
    setTarget(tasbihOption.target)
    setCount(0)
  }

  const adjustTarget = (increment) => {
    const newTarget = Math.max(1, target + increment)
    setTarget(newTarget)
  }

  const getProgress = () => {
    return Math.min((count / target) * 100, 100)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return (
    <section id="tasbih" className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            السبحة الإلكترونية
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            سبح الله واذكره في أي وقت ومكان مع السبحة الإلكترونية المتطورة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tasbih Counter */}
          <div className="lg:col-span-2">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                  {currentTasbih}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Circle */}
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                      className="text-green-500 transition-all duration-300 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Count display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {count}
                    </span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      من {target}
                    </span>
                  </div>
                </div>

                {/* Main Counter Button */}
                <Button
                  onClick={incrementCount}
                  className="w-32 h-32 rounded-full text-2xl font-bold bg-green-600 hover:bg-green-700 active:scale-95 transition-all duration-150"
                  style={{
                    background: count >= target 
                      ? 'linear-gradient(45deg, #10b981, #059669)' 
                      : 'linear-gradient(45deg, #16a34a, #15803d)'
                  }}
                >
                  سبح
                </Button>

                {/* Target Controls */}
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTarget(-1)}
                    disabled={target <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-[80px]">
                    الهدف: {target}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustTarget(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    onClick={resetCount}
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>إعادة تعيين</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <span>الصوت</span>
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tasbih Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">أنواع التسبيح</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasbihOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant={currentTasbih === option.text ? "default" : "outline"}
                    className={`w-full text-right justify-start ${
                      currentTasbih === option.text 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'hover:bg-green-50 dark:hover:bg-green-900'
                    }`}
                    onClick={() => changeTasbih(option)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{option.text}</span>
                      <Badge variant="secondary" className="text-xs">
                        {option.target}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">السجل الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length > 0 ? (
                  <div className="space-y-3">
                    {history.slice(0, 5).map((session, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm">{session.tasbih}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {session.count} من {session.target}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            مكتمل
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDate(session.completedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                    لا يوجد سجل بعد
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  الإعدادات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">الصوت</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={soundEnabled ? 'bg-green-100 dark:bg-green-900' : ''}
                  >
                    {soundEnabled ? 'مفعل' : 'معطل'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">الاهتزاز</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVibrationEnabled(!vibrationEnabled)}
                    className={vibrationEnabled ? 'bg-green-100 dark:bg-green-900' : ''}
                  >
                    {vibrationEnabled ? 'مفعل' : 'معطل'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TasbihSection

