import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react'
import AuthModal from './AuthModal.jsx'
// --- 1. استيراد الشعار الجديد ---
import logo from '@/assets/logo.png'

const Navbar = ({ darkMode, toggleDarkMode, user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleAuthClick = () => {
    if (user) {
      onLogout()
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* --- 2. تم تعديل قسم الشعار بالكامل --- */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* تم استبدال النص بالصورة */}
                <img className="h-10" src={logo} alt="شعار نور الإسلام" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 rtl:space-x-reverse">
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  الرئيسية
                </a>
                <a href="#quran" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  القرآن الكريم
                </a>
                <a href="#azkar" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  الأذكار
                </a>
                <a href="#hadith" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  الأحاديث
                </a>
                <a href="#duas" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  الأدعية
                </a>
                <a href="#sadaqa" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  الصدقة الجارية
                </a>
                <a href="#tasbih" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  السبحة الإلكترونية
                </a>
                <a href="#prayer-times" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  أوقات الصلاة
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-gray-700 dark:text-gray-300"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    مرحباً، {user.username}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAuthClick}
                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAuthClick}
                  className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                >
                  <User className="h-4 w-4 mr-2" />
                  تسجيل الدخول
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                الرئيسية
              </a>
              <a href="#quran" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                القرآن الكريم
              </a>
              <a href="#azkar" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                الأذكار
              </a>
              <a href="#hadith" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                الأحاديث
              </a>
              <a href="#duas" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                الأدعية
              </a>
              <a href="#sadaqa" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                الصدقة الجارية
              </a>
              <a href="#tasbih" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                السبحة الإلكترونية
              </a>
              <a href="#prayer-times" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
                أوقات الصلاة
              </a>
              <div className="flex items-center space-x-4 rtl:space-x-reverse px-3 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      مرحباً، {user.username}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAuthClick}
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAuthClick}
                    className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                  >
                    <User className="h-4 w-4 mr-2" />
                    تسجيل الدخول
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={onLogin}
      />
    </>
  )
}

export default Navbar
