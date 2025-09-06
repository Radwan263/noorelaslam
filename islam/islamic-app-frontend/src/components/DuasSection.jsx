import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Search, Copy, Share2, Plus, Star } from 'lucide-react'

const DuasSection = () => {
  const [duas, setDuas] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState([])

  // Mock duas data
  const mockDuas = [
    {
      id: 1,
      title: "دعاء الاستفتاح",
      arabic: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ",
      translation: "اللهم باعد بيني وبين خطاياي كما باعدت بين المشرق والمغرب",
      meaning: "دعاء يُقال في بداية الصلاة لطلب المغفرة والتطهير من الذنوب",
      category: "الصلاة",
      source: "البخاري ومسلم"
    },
    {
      id: 2,
      title: "دعاء السفر",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
      translation: "سبحان الذي سخر لنا هذا وما كنا له مقرنين وإنا إلى ربنا لمنقلبون",
      meaning: "دعاء يُقال عند ركوب وسائل النقل والسفر",
      category: "السفر",
      source: "الترمذي"
    },
    {
      id: 3,
      title: "دعاء الطعام",
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
      translation: "اللهم بارك لنا فيما رزقتنا وقنا عذاب النار",
      meaning: "دعاء يُقال بعد الانتهاء من الطعام",
      category: "الطعام",
      source: "الترمذي"
    },
    {
      id: 4,
      title: "دعاء الاستخارة",
      arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ",
      translation: "اللهم إني أستخيرك بعلمك وأستقدرك بقدرتك",
      meaning: "دعاء يُقال عند طلب الخيرة من الله في الأمور",
      category: "عام",
      source: "البخاري"
    },
    {
      id: 5,
      title: "دعاء المريض",
      arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي",
      translation: "اللهم رب الناس أذهب البأس واشف أنت الشافي",
      meaning: "دعاء يُقال للمريض طلباً للشفاء",
      category: "الصحة",
      source: "البخاري ومسلم"
    },
    {
      id: 6,
      title: "دعاء النوم",
      arabic: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ",
      translation: "اللهم أسلمت نفسي إليك وفوضت أمري إليك",
      meaning: "دعاء يُقال عند النوم",
      category: "النوم",
      source: "البخاري ومسلم"
    }
  ]

  const categories = [
    { id: 'all', name: 'جميع الأدعية' },
    { id: 'الصلاة', name: 'الصلاة' },
    { id: 'السفر', name: 'السفر' },
    { id: 'الطعام', name: 'الطعام' },
    { id: 'الصحة', name: 'الصحة' },
    { id: 'النوم', name: 'النوم' },
    { id: 'عام', name: 'عام' }
  ]

  useEffect(() => {
    setDuas(mockDuas)
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteDuas')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const filteredDuas = duas.filter(dua => {
    const matchesSearch = dua.title.includes(searchQuery) || 
                         dua.arabic.includes(searchQuery) ||
                         dua.translation.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || dua.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (duaId) => {
    const newFavorites = favorites.includes(duaId)
      ? favorites.filter(id => id !== duaId)
      : [...favorites, duaId]
    
    setFavorites(newFavorites)
    localStorage.setItem('favoriteDuas', JSON.stringify(newFavorites))
  }

  const copyDua = (dua) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\nالمصدر: ${dua.source}`
    navigator.clipboard.writeText(text)
  }

  return (
    <section id="duas" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الأدعية المأثورة
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            مجموعة من الأدعية المأثورة من القرآن الكريم والسنة النبوية
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الأدعية..."
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

        {/* Duas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDuas.map((dua) => (
            <Card key={dua.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{dua.title}</CardTitle>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Badge variant="secondary" className="text-xs">
                      {dua.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(dua.id)}
                      className="p-1"
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          favorites.includes(dua.id) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Arabic Text */}
                  <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                    <p className="text-lg font-arabic leading-relaxed text-gray-900 dark:text-white text-center">
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">الترجمة: </span>
                      {dua.translation}
                    </p>
                  </div>

                  {/* Meaning */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">المعنى: </span>
                      {dua.meaning}
                    </p>
                  </div>

                  {/* Source */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">المصدر: </span>
                    {dua.source}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 rtl:space-x-reverse pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyDua(dua)}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Custom Dua */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة دعاء مخصص
          </Button>
        </div>
      </div>
    </section>
  )
}

export default DuasSection

