import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, RotateCcw, Plus, Sunrise, Sunset, Moon, Zap } from 'lucide-react'

const AzkarSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('morning')
  const [counters, setCounters] = useState({})

  const azkarCategories = [
    { id: 'morning', name: 'أذكار الصباح', icon: Sunrise, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'evening', name: 'أذكار المساء', icon: Sunset, color: 'bg-orange-100 text-orange-800' },
    { id: 'sleep', name: 'أذكار النوم', icon: Moon, color: 'bg-blue-100 text-blue-800' },
    { id: 'prayer', name: 'أذكار بعد الصلاة', icon: Zap, color: 'bg-green-100 text-green-800' },
  ]

  const azkarData = {
    morning: [
      {
        id: 1,
        text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        count: 1,
        reference: "مسلم"
      },
      {
        id: 2,
        text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        count: 1,
        reference: "الترمذي"
      },
      {
        id: 3,
        text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        count: 100,
        reference: "البخاري ومسلم"
      }
    ],
    evening: [
      {
        id: 4,
        text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        count: 1,
        reference: "مسلم"
      },
      {
        id: 5,
        text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        count: 1,
        reference: "الترمذي"
      }
    ],
    sleep: [
      {
        id: 6,
        text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        count: 1,
        reference: "البخاري"
      },
      {
        id: 7,
        text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        count: 3,
        reference: "الترمذي"
      }
    ],
    prayer: [
      {
        id: 8,
        text: "أَسْتَغْفِرُ اللَّهَ",
        count: 3,
        reference: "مسلم"
      },
      {
        id: 9,
        text: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        count: 1,
        reference: "مسلم"
      }
    ]
  }

  const incrementCounter = (azkarId) => {
    setCounters(prev => ({
      ...prev,
      [azkarId]: (prev[azkarId] || 0) + 1
    }))
  }

  const resetCounter = (azkarId) => {
    setCounters(prev => ({
      ...prev,
      [azkarId]: 0
    }))
  }

  const currentAzkar = azkarData[selectedCategory] || []

  return (
    <section id="azkar" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الأذكار
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            أذكار الصباح والمساء وأذكار النوم وبعد الصلاة
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {azkarCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse ${
                  selectedCategory === category.id 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 dark:hover:bg-green-900'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            )
          })}
        </div>

        {/* Azkar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAzkar.map((zikr) => (
            <Card key={zikr.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">ذكر {zikr.id}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {zikr.reference}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg font-arabic leading-relaxed text-gray-900 dark:text-white">
                    {zikr.text}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      العدد المطلوب: {zikr.count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      العدد الحالي: {counters[zikr.id] || 0}
                    </div>
                  </div>

                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      onClick={() => incrementCounter(zikr.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      سبح
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => resetCounter(zikr.id)}
                      className="px-3"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(((counters[zikr.id] || 0) / zikr.count) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Custom Zikr */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900">
            <Plus className="h-4 w-4 mr-2" />
            إضافة ذكر مخصص
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AzkarSection

