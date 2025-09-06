import { Button } from '@/components/ui/button.jsx'
import { BookOpen, Clock, Heart, Headphones } from 'lucide-react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-green-600 dark:text-green-400">بسم الله الرحمن الرحيم</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            تطبيقك الشامل للقرآن الكريم والأذكار والأحاديث والأدعية
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            استمتع بتجربة روحانية متكاملة مع ميزات متقدمة للتسبيح والأذان وأوقات الصلاة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              <BookOpen className="mr-2 h-5 w-5" />
              ابدأ القراءة
            </Button>
            <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-3">
              <Headphones className="mr-2 h-5 w-5" />
              استمع للقرآن
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">القرآن الكريم</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                نص وصوت وتفسير القرآن الكريم مع إمكانية البحث والعلامات المرجعية
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">الأذكار والأدعية</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                مجموعة شاملة من الأذكار والأدعية مع السبحة الإلكترونية
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">الأحاديث النبوية</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                مجموعة من الأحاديث الصحيحة مع إمكانية البحث والتصفح
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">أوقات الصلاة</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                أوقات الصلاة الدقيقة مع الأذان واتجاه القبلة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

