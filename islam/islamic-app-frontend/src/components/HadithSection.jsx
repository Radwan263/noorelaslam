import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BookOpen, Search, Heart, Share2, Copy } from 'lucide-react'

const HadithSection = () => {
  const [hadiths, setHadiths] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(false)

  // Mock hadith data
  const mockHadiths = [
    {
      id: 1,
      text: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      translation: "الأعمال بالنيات وإنما لكل امرئ ما نوى",
      narrator: "عمر بن الخطاب",
      source: "البخاري ومسلم",
      category: "النية",
      number: 1
    },
    {
      id: 2,
      text: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      translation: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت",
      narrator: "أبو هريرة",
      source: "البخاري ومسلم",
      category: "الأخلاق",
      number: 2
    },
    {
      id: 3,
      text: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
      translation: "المسلم من سلم المسلمون من لسانه ويده",
      narrator: "عبد الله بن عمرو",
      source: "البخاري ومسلم",
      category: "الأخلاق",
      number: 3
    },
    {
      id: 4,
      text: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      translation: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
      narrator: "أنس بن مالك",
      source: "البخاري ومسلم",
      category: "الإيمان",
      number: 4
    },
    {
      id: 5,
      text: "مَنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
      translation: "من حسن إسلام المرء تركه ما لا يعنيه",
      narrator: "أبو هريرة",
      source: "الترمذي",
      category: "الأخلاق",
      number: 5
    }
  ]

  const categories = [
    { id: 'all', name: 'جميع الأحاديث' },
    { id: 'النية', name: 'النية' },
    { id: 'الأخلاق', name: 'الأخلاق' },
    { id: 'الإيمان', name: 'الإيمان' },
    { id: 'العبادة', name: 'العبادة' },
    { id: 'المعاملات', name: 'المعاملات' }
  ]

  useEffect(() => {
    setHadiths(mockHadiths)
  }, [])

  const filteredHadiths = hadiths.filter(hadith => {
    const matchesSearch = hadith.text.includes(searchQuery) || 
                         hadith.translation.includes(searchQuery) ||
                         hadith.narrator.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || hadith.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyHadith = (hadith) => {
    const text = `${hadith.text}\n\nالراوي: ${hadith.narrator}\nالمصدر: ${hadith.source}`
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="hadith" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الأحاديث النبوية
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            مجموعة من الأحاديث الصحيحة من كتب السنة النبوية المطهرة
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الأحاديث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'hover:bg-green-50 dark:hover:bg-green-900'
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Hadiths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHadiths.map((hadith) => (
            <Card key={hadith.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">الحديث رقم {hadith.number}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {hadith.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Hadith Text */}
                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <p className="text-lg font-arabic leading-relaxed text-gray-900 dark:text-white">
                      {hadith.text}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {hadith.translation}
                    </p>
                  </div>

                  {/* Narrator and Source */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold ml-2">الراوي:</span>
                      <span>{hadith.narrator}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold ml-2">المصدر:</span>
                      <span>{hadith.source}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyHadith(hadith)}
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      نسخ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredHadiths.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              لم يتم العثور على أحاديث تطابق البحث
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredHadiths.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
              disabled={loading}
            >
              {loading ? 'جاري التحميل...' : 'تحميل المزيد من الأحاديث'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default HadithSection

