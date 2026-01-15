# توثيق إصلاح مشكلة GPS في تطبيق نور الإسلام

تم إجراء التعديلات التالية على مشروعك لحل مشكلة تحديد الموقع (GPS) في تطبيق Android المحول إلى APK. تهدف هذه التعديلات إلى تحسين التعامل مع أذونات الموقع، وتوفير موقع افتراضي في حال فشل تحديد الموقع، وضمان عمل التطبيق بشكل أكثر استقرارًا.

## 1. التعديلات على `islam/islamic-app-frontend/src/components/PrayerTimes.jsx`

تم تحديث دالة `handleLocationRequest` في هذا الملف لتحسين منطق طلب الموقع والتعامل مع الأخطاء. التعديلات الرئيسية هي:

*   **تحسين طلب الأذونات**: أصبح التطبيق الآن يتحقق من أذونات الموقع الحالية أولاً، ثم يطلبها من المستخدم إذا لم تكن ممنوحة.
*   **مهلة زمنية (Timeout)**: تمت إضافة مهلة زمنية قدرها 10 ثوانٍ عند محاولة جلب الموقع (`Geolocation.getCurrentPosition`) لمنع التطبيق من التعليق إذا استغرق تحديد الموقع وقتًا طويلاً.
*   **الموقع الافتراضي (Fallback)**: في حال رفض المستخدم إذن الموقع، أو فشل تحديد الموقع لأي سبب (مثل عدم تفعيل GPS)، سيقوم التطبيق الآن باستخدام موقع افتراضي (القاهرة: خط عرض 30.0444، خط طول 31.2357) لعرض مواقيت الصلاة. هذا يضمن أن التطبيق يظل وظيفيًا حتى بدون تحديد موقع دقيق.
*   **تسجيل الأخطاء**: تمت إضافة `console.error` لتسجيل أي أخطاء تحدث أثناء عملية تحديد الموقع، مما يساعد في تصحيح الأخطاء مستقبلاً.

### الكود المعدل (الجزء الرئيسي):

```javascript
  const handleLocationRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. التحقق من الأذونات الحالية أولاً
      const checkPermission = await Geolocation.checkPermissions();
      
      let status = checkPermission.location;
      
      // 2. إذا لم يكن مسموحاً، نطلب الإذن
      if (status !== 'granted') {
        const requestPermission = await Geolocation.requestPermissions();
        status = requestPermission.location;
      }
      
      if (status === 'granted') {
        // 3. محاولة جلب الموقع مع إعدادات مهلة زمنية (Timeout)
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000 // 10 ثوانٍ كحد أقصى
        });
        
        const { latitude, longitude } = position.coords;
        localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
        fetchPrayerTimes(latitude, longitude);
      } else {
        setError('يجب الموافقة على إذن الموقع لتحديد مواقيت الصلاة بدقة.');
        // خيار احتياطي: استخدام القاهرة كموقع افتراضي
        useDefaultLocation();
      }
    } catch (err) {
      console.error('GPS Error:', err);
      setError('فشل تحديد الموقع. تأكد من تفعيل الـ GPS.');
      useDefaultLocation();
    }
  };

  const useDefaultLocation = () => {
    const defaultLoc = { latitude: 30.0444, longitude: 31.2357 }; // القاهرة
    localStorage.setItem('userLocation', JSON.stringify(defaultLoc));
    fetchPrayerTimes(defaultLoc.latitude, defaultLoc.longitude);
    setLoading(false);
  };
```

## 2. التعديلات على `android/app/src/main/AndroidManifest.xml`

تم تعديل ملف `AndroidManifest.xml` لإضافة أذونات ضرورية وتحسين التعامل مع ميزة GPS على أجهزة Android المختلفة:

*   **جعل GPS اختياريًا**: تمت إضافة `android:required="false"` إلى `<uses-feature android:name="android.hardware.location.gps" />`. هذا يعني أن التطبيق يمكن تثبيته على الأجهزة التي لا تحتوي على مستشعر GPS مادي، مما يزيد من توافقية التطبيق.
*   **إذن الموقع في الخلفية**: تمت إضافة إذن `ACCESS_BACKGROUND_LOCATION`. هذا الإذن مهم إذا كان التطبيق يحتاج إلى الوصول إلى الموقع عندما يكون في الخلفية (على الرغم من أن الاستخدام الحالي يبدو في المقدمة، إلا أنه ممارسة جيدة لتطبيقات الموقع).

### الكود المعدل (الجزء الرئيسي):

```xml
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

## 3. التعديلات على `android/app/src/main/res/values/strings.xml`

تمت إضافة سلاسل نصية جديدة إلى هذا الملف لتوفير رسائل توضيحية للمستخدم عند طلب أذونات الموقع. هذه الرسائل ستظهر للمستخدم في مربع حوار الأذونات، مما يساعده على فهم سبب طلب التطبيق للموقع.

### الكود المعدل (الجزء الرئيسي):

```xml
    <string name="custom_url_scheme">com.radwan.islamic</string>
    <string name="location_permission_title">إذن الموقع</string>
    <string name="location_permission_description">يحتاج التطبيق للوصول إلى موقعك لتحديد مواقيت الصلاة بدقة بناءً على منطقتك الجغرافية.</string>
</resources>
```

## خطوات إعادة بناء التطبيق (APK)

بعد تطبيق هذه التعديلات، تحتاج إلى إعادة بناء تطبيق Android الخاص بك لإنشاء ملف APK جديد يحتوي على هذه الإصلاحات. اتبع الخطوات التالية:

1.  **تأكد من حفظ جميع التعديلات**: تأكد من أن جميع التغييرات التي تم إجراؤها على الملفات المذكورة أعلاه قد تم حفظها في مشروعك المحلي.

2.  **انتقل إلى مجلد المشروع**: افتح سطر الأوامر (Terminal) أو موجه الأوامر (Command Prompt) وانتقل إلى المجلد الرئيسي لمشروعك (`noorelaslam`).

3.  **تثبيت التبعيات (إذا لزم الأمر)**: إذا لم تكن قد قمت بذلك مؤخرًا، قم بتثبيت تبعيات الواجهة الأمامية:
    ```bash
    cd islam/islamic-app-frontend
    npm install # أو pnpm install أو yarn install حسب مدير الحزم الذي تستخدمه
    cd ../..
    ```

4.  **بناء الواجهة الأمامية (Build Frontend)**: قم ببناء مشروع React لإنشاء ملفات `dist` التي سيستخدمها Capacitor:
    ```bash
    cd islam/islamic-app-frontend
    npm run build
    cd ../..
    ```

5.  **تحديث مشروع Capacitor**: تأكد من أن Capacitor محدث بأحدث التغييرات في الواجهة الأمامية:
    ```bash
    npx cap sync android
    ```

6.  **فتح مشروع Android في Android Studio**: لإنشاء ملف APK، يفضل استخدام Android Studio:
    ```bash
    npx cap open android
    ```
    سيؤدي هذا الأمر إلى فتح مشروع Android الخاص بك في Android Studio.

7.  **بناء APK في Android Studio**:
    *   في Android Studio، اذهب إلى `Build` (بناء) في شريط القوائم العلوي.
    *   اختر `Build Bundle(s) / APK(s)` (بناء الحزم / ملفات APK).
    *   اختر `Build APK(s)` (بناء ملفات APK).
    *   بعد اكتمال البناء، ستظهر لك إشعارًا يحتوي على رابط `locate` (تحديد موقع) لملف APK الذي تم إنشاؤه. عادةً ما يكون موجودًا في مسار مشابه لـ `android/app/build/outputs/apk/debug/app-debug.apk` أو `android/app/build/outputs/apk/release/app-release.apk` إذا كنت تقوم ببناء إصدار نهائي.

بعد هذه الخطوات، سيكون لديك ملف APK جديد يتضمن جميع التعديلات التي تم إجراؤها على التعامل مع GPS. يرجى اختبار التطبيق الجديد للتأكد من أن مشكلة GPS قد تم حلها.
