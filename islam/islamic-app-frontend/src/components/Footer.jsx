import { Heart, Facebook, MessageCircle } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* App Info */}
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              التطبيق الإسلامي الشامل
            </h3>
            <p className="text-gray-300 mb-4">
              تطبيقك المتكامل للقرآن الكريم والأذكار والأحاديث والأدعية مع ميزات متقدمة للعبادة والتسبيح.
            </p>
            <p className="text-gray-400 text-sm">
              تم تطويره بـ <Heart className="inline h-4 w-4 text-red-500" /> لخدمة المسلمين في جميع أنحاء العالم
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#quran" className="text-gray-300 hover:text-green-400 transition-colors">
                  القرآن الكريم
                </a>
              </li>
              <li>
                <a href="#azkar" className="text-gray-300 hover:text-green-400 transition-colors">
                  الأذكار
                </a>
              </li>
              <li>
                <a href="#hadith" className="text-gray-300 hover:text-green-400 transition-colors">
                  الأحاديث
                </a>
              </li>
              <li>
                <a href="#prayer-times" className="text-gray-300 hover:text-green-400 transition-colors">
                  أوقات الصلاة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  السبحة الإلكترونية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  الصدقة الجارية
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">معلومات المطور</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Facebook className="h-5 w-5 text-blue-500" />
                <a 
                  href="https://m.facebook.com/Radwan263" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Facebook: Radwan263
                </a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <a 
                  href="https://t.me/Radwan263" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Telegram: @Radwan263
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300">
                "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                الزلزلة: 7
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 التطبيق الإسلامي الشامل. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            تم تطوير هذا التطبيق لوجه الله تعالى ولخدمة الإسلام والمسلمين
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

