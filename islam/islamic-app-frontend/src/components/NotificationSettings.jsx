import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Bell, Clock, BookOpen, Heart, Star } from 'lucide-react'

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    prayerTimes: true,
    azkarReminders: true,
    quranReading: false,
    duaReminders: false,
    tasbihGoals: true
  })

  const [reminderTimes, setReminderTimes] = useState({
    morningAzkar: '06:00',
    eveningAzkar: '18:00',
    quranReading: '20:00',
    duaTime: '21:00'
  })

  const [permission, setPermission] = useState('default')

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }

    // Load saved settings
    const savedNotifications = localStorage.getItem('notificationSettings')
    const savedTimes = localStorage.getItem('reminderTimes')
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
    if (savedTimes) {
      setReminderTimes(JSON.parse(savedTimes))
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(notifications))
    localStorage.setItem('reminderTimes', JSON.stringify(reminderTimes))
  }, [notifications, reminderTimes])

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        new Notification('تم تفعيل الإشعارات!', {
          body: 'ستتلقى الآن تذكيرات للصلاة والأذكار',
          icon: '/icon-192x192.png'
        })
      }
    }
  }

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleTimeChange = (type, time) => {
    setReminderTimes(prev => ({
      ...prev,
      [type]: time
    }))
  }

  const testNotification = (type) => {
    if (permission === 'granted') {
      const messages = {
        prayerTimes: 'حان وقت صلاة المغرب',
        azkarReminders: 'تذكير: أذكار المساء',
        quranReading: 'وقت قراءة القرآن الكريم',
        duaReminders: 'وقت الدعاء والذكر',
        tasbihGoals: 'تم إكمال هدف التسبيح!'
      }
      
      new Notification('إشعار تجريبي', {
        body: messages[type],
        icon: '/icon-192x192.png'
      })
    }
  }

  const scheduleNotifications = () => {
    if ('serviceWorker' in navigator && permission === 'granted') {
      // This would typically register a service worker for background notifications
      console.log('Scheduling notifications...')
      
      // For demo purposes, we'll just show a confirmation
      new Notification('تم جدولة الإشعارات', {
        body: 'ستتلقى التذكيرات في الأوقات المحددة',
        icon: '/icon-192x192.png'
      })
    }
  }

  return (
    <section id="notifications" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            إعدادات الإشعارات
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اضبط التذكيرات والإشعارات لتساعدك على المواظبة على العبادات
          </p>
        </div>

        <div className="space-y-6">
          {/* Permission Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                حالة الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {permission === 'granted' ? 'مفعلة' : 
                     permission === 'denied' ? 'مرفوضة' : 'غير مفعلة'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {permission === 'granted' ? 'يمكنك تلقي الإشعارات' :
                     permission === 'denied' ? 'تم رفض الإشعارات من المتصفح' :
                     'اضغط لتفعيل الإشعارات'}
                  </p>
                </div>
                {permission !== 'granted' && (
                  <Button onClick={requestPermission} className="bg-green-600 hover:bg-green-700">
                    تفعيل الإشعارات
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Prayer Times Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                إشعارات أوقات الصلاة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="prayer-notifications">تذكيرات الصلاة</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تلقي إشعار قبل كل صلاة بـ 5 دقائق
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="prayer-notifications"
                    checked={notifications.prayerTimes}
                    onCheckedChange={() => handleNotificationToggle('prayerTimes')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testNotification('prayerTimes')}
                    disabled={permission !== 'granted'}
                  >
                    تجربة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Azkar Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                تذكيرات الأذكار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="azkar-notifications">أذكار الصباح والمساء</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تذكيرات يومية للأذكار
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="azkar-notifications"
                    checked={notifications.azkarReminders}
                    onCheckedChange={() => handleNotificationToggle('azkarReminders')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testNotification('azkarReminders')}
                    disabled={permission !== 'granted'}
                  >
                    تجربة
                  </Button>
                </div>
              </div>

              {notifications.azkarReminders && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="morning-time">وقت أذكار الصباح</Label>
                    <input
                      id="morning-time"
                      type="time"
                      value={reminderTimes.morningAzkar}
                      onChange={(e) => handleTimeChange('morningAzkar', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="evening-time">وقت أذكار المساء</Label>
                    <input
                      id="evening-time"
                      type="time"
                      value={reminderTimes.eveningAzkar}
                      onChange={(e) => handleTimeChange('eveningAzkar', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quran Reading Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                تذكيرات قراءة القرآن
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quran-notifications">تذكير قراءة القرآن</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تذكير يومي لقراءة القرآن الكريم
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="quran-notifications"
                    checked={notifications.quranReading}
                    onCheckedChange={() => handleNotificationToggle('quranReading')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testNotification('quranReading')}
                    disabled={permission !== 'granted'}
                  >
                    تجربة
                  </Button>
                </div>
              </div>

              {notifications.quranReading && (
                <div>
                  <Label htmlFor="quran-time">وقت التذكير</Label>
                  <input
                    id="quran-time"
                    type="time"
                    value={reminderTimes.quranReading}
                    onChange={(e) => handleTimeChange('quranReading', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dua Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                تذكيرات الدعاء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dua-notifications">تذكير الدعاء</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    تذكير يومي للدعاء والذكر
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="dua-notifications"
                    checked={notifications.duaReminders}
                    onCheckedChange={() => handleNotificationToggle('duaReminders')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testNotification('duaReminders')}
                    disabled={permission !== 'granted'}
                  >
                    تجربة
                  </Button>
                </div>
              </div>

              {notifications.duaReminders && (
                <div>
                  <Label htmlFor="dua-time">وقت التذكير</Label>
                  <input
                    id="dua-time"
                    type="time"
                    value={reminderTimes.duaTime}
                    onChange={(e) => handleTimeChange('duaTime', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tasbih Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                إشعارات السبحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tasbih-notifications">إنجاز أهداف التسبيح</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    إشعار عند إكمال هدف التسبيح
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch
                    id="tasbih-notifications"
                    checked={notifications.tasbihGoals}
                    onCheckedChange={() => handleNotificationToggle('tasbihGoals')}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testNotification('tasbihGoals')}
                    disabled={permission !== 'granted'}
                  >
                    تجربة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings */}
          <div className="text-center">
            <Button
              onClick={scheduleNotifications}
              className="bg-green-600 hover:bg-green-700"
              disabled={permission !== 'granted'}
            >
              حفظ الإعدادات وجدولة التذكيرات
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotificationSettings

