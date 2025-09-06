# دليل التثبيت والتشغيل - التطبيق الإسلامي الشامل

## نظرة عامة

هذا الدليل يوضح كيفية تثبيت وتشغيل التطبيق الإسلامي الشامل على جهازك المحلي أو على خادم.

## متطلبات النظام

### الأساسية
- **نظام التشغيل**: Windows 10+، macOS 10.15+، أو Linux Ubuntu 18.04+
- **ذاكرة الوصول العشوائي**: 4 جيجابايت على الأقل
- **مساحة القرص الصلب**: 2 جيجابايت متاحة
- **اتصال بالإنترنت**: مطلوب للتثبيت وبعض الميزات

### البرامج المطلوبة
- **Node.js**: الإصدار 18 أو أحدث
- **Python**: الإصدار 3.8 أو أحدث
- **Git**: لتحميل الكود المصدري
- **محرر نصوص**: VS Code أو أي محرر آخر (اختياري)

## خطوات التثبيت

### 1. تحميل وتثبيت Node.js

#### على Windows:
1. اذهب إلى https://nodejs.org
2. حمل النسخة LTS (الموصى بها)
3. شغل ملف التثبيت واتبع التعليمات
4. تأكد من التثبيت بفتح Command Prompt وكتابة:
```cmd
node --version
npm --version
```

#### على macOS:
```bash
# باستخدام Homebrew
brew install node

# أو حمل من الموقع الرسمي
# https://nodejs.org
```

#### على Linux (Ubuntu/Debian):
```bash
# تحديث قائمة الحزم
sudo apt update

# تثبيت Node.js و npm
sudo apt install nodejs npm

# تثبيت أحدث إصدار (اختياري)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. تحميل وتثبيت Python

#### على Windows:
1. اذهب إلى https://python.org
2. حمل Python 3.8+ 
3. **مهم**: تأكد من تحديد "Add Python to PATH" أثناء التثبيت
4. تأكد من التثبيت:
```cmd
python --version
pip --version
```

#### على macOS:
```bash
# باستخدام Homebrew
brew install python

# أو حمل من الموقع الرسمي
```

#### على Linux:
```bash
# Python مثبت عادة، لكن تأكد من pip
sudo apt install python3 python3-pip python3-venv
```

### 3. تحميل وتثبيت Git

#### على Windows:
1. اذهب إلى https://git-scm.com
2. حمل Git for Windows
3. شغل ملف التثبيت مع الإعدادات الافتراضية

#### على macOS:
```bash
# باستخدام Homebrew
brew install git

# أو باستخدام Xcode Command Line Tools
xcode-select --install
```

#### على Linux:
```bash
sudo apt install git
```

## تشغيل التطبيق

### 1. استخراج الملفات

```bash
# استخراج الأرشيف المضغوط
tar -xzf islamic-app-complete.tar.gz

# الدخول إلى المجلد
cd islamic-app-complete/
```

### 2. تشغيل التطبيق الخلفي (Backend)

```bash
# الدخول إلى مجلد Backend
cd islamic_app_backend/

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
# على Windows:
venv\Scripts\activate
# على macOS/Linux:
source venv/bin/activate

# تثبيت التبعيات
pip install -r requirements.txt

# تشغيل الخادم
python src/main.py
```

سيعمل الخادم الخلفي على `http://localhost:5000`

### 3. تشغيل التطبيق الأمامي (Frontend)

افتح terminal/command prompt جديد:

```bash
# الدخول إلى مجلد Frontend
cd islamic-app-frontend/

# تثبيت pnpm (إذا لم يكن مثبتاً)
npm install -g pnpm

# تثبيت التبعيات
pnpm install

# تشغيل خادم التطوير
pnpm run dev
```

سيعمل التطبيق الأمامي على `http://localhost:5174`

### 4. فتح التطبيق

افتح متصفح الويب واذهب إلى `http://localhost:5174`

## بناء التطبيق للنشر

### بناء Frontend للنشر:

```bash
cd islamic-app-frontend/
pnpm run build
```

ستجد ملفات البناء في مجلد `dist/`

### نشر على خادم ويب:

```bash
# نسخ ملفات dist إلى خادم الويب
cp -r dist/* /var/www/html/

# أو باستخدام خادم بسيط للاختبار
cd dist/
python -m http.server 8080
```

## حل المشاكل الشائعة

### مشكلة: "node: command not found"
**الحل**: تأكد من تثبيت Node.js وإضافته إلى PATH

### مشكلة: "python: command not found"
**الحل**: 
- على Windows: استخدم `py` بدلاً من `python`
- تأكد من إضافة Python إلى PATH

### مشكلة: "Permission denied" على Linux/macOS
**الحل**: استخدم `sudo` أو غير صلاحيات المجلد:
```bash
sudo chown -R $USER:$USER ./
```

### مشكلة: "Port already in use"
**الحل**: 
- أوقف العملية التي تستخدم المنفذ
- أو غير المنفذ في الإعدادات

### مشكلة: CORS errors
**الحل**: تأكد من تشغيل Backend قبل Frontend

### مشكلة: "Module not found"
**الحل**: 
- تأكد من تثبيت جميع التبعيات
- احذف `node_modules` و `package-lock.json` ثم أعد التثبيت

## إعدادات متقدمة

### تغيير منفذ Frontend:
```bash
# في ملف vite.config.js
export default {
  server: {
    port: 3000
  }
}
```

### تغيير منفذ Backend:
```python
# في ملف src/main.py
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
```

### إعداد قاعدة البيانات:
قاعدة البيانات SQLite ستُنشأ تلقائياً في `islamic_app_backend/database.db`

### إعداد متغيرات البيئة:
```bash
# إنشاء ملف .env في مجلد Backend
echo "SECRET_KEY=your-secret-key-here" > .env
echo "DATABASE_URL=sqlite:///database.db" >> .env
```

## الأمان والحماية

### للاستخدام المحلي:
- التطبيق آمن للاستخدام المحلي
- البيانات محفوظة محلياً

### للنشر على الإنترنت:
- استخدم HTTPS
- غير المفاتيح السرية
- استخدم قاعدة بيانات آمنة
- فعل جدار الحماية

## النسخ الاحتياطي

### نسخ احتياطي للبيانات:
```bash
# نسخ قاعدة البيانات
cp islamic_app_backend/database.db backup_$(date +%Y%m%d).db

# نسخ إعدادات المستخدم (في المتصفح)
# البيانات محفوظة في localStorage
```

## التحديثات

### تحديث التبعيات:
```bash
# Frontend
cd islamic-app-frontend/
pnpm update

# Backend
cd islamic_app_backend/
pip install --upgrade -r requirements.txt
```

## الدعم الفني

إذا واجهت أي مشاكل:

1. **تحقق من الأخطاء**: اقرأ رسائل الخطأ في Terminal
2. **تحقق من المتطلبات**: تأكد من تثبيت جميع البرامج المطلوبة
3. **أعد التشغيل**: أعد تشغيل الخوادم والمتصفح
4. **تواصل معنا**:
   - Facebook: https://m.facebook.com/Radwan263
   - Telegram: https://t.me/Radwan263

## ملاحظات مهمة

- **الأداء**: للحصول على أفضل أداء، استخدم متصفح حديث (Chrome، Firefox، Safari، Edge)
- **الذاكرة**: التطبيق يستخدم حوالي 200-500 ميجابايت من الذاكرة
- **الشبكة**: بعض الميزات تتطلب اتصال بالإنترنت (أوقات الصلاة، القرآن الصوتي)
- **التخزين**: البيانات الشخصية محفوظة في متصفحك محلياً

---

**بالتوفيق في استخدام التطبيق! 🤲**

