// Translation Dictionary
const translations = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-plants': 'Plants',
    'nav-diseases': 'Diseases',
    'nav-community': 'Community',
    'nav-about': 'About',
    'nav-feedback': 'Feedback',
    
    // Index Page
    'welcome-title': 'Welcome to the world of plants!',
    'welcome-subtitle': 'An all-in-one platform to identify plants, explore their varieties, and their care',
    'search-placeholder': 'Search for a plant...',
    
    'special-title': 'What Makes MyPlant Special',
    'care-time-title': 'Care Time',
    'care-time-desc': 'Set reminders for watering, and receive timely notifications for your plants to stay healthy.',
    'plant-id-title': 'Plant Identification',
    'plant-id-desc': 'Not sure what plant it is? Use AI to identify it quickly and get information about it',
    'weather-title': 'Weather',
    'weather-desc': 'Check the weather near you to adjust watering and care routines , especially on hot, rainy, or windy days.',
    'nursery-title': 'Plant Nursery',
    'nursery-desc': 'Find nearby plant nurseries across Jordan and discover the nearest nursery to your location.',
    
    'explore-plants': 'Explore The Plants',
    'see-more-plants': 'See more plants',
    
    'plant-diseases': 'Plant Diseases',
    'infectious-diseases': 'Infectious Diseases',
    'infectious-desc': 'Caused by bacteria, fungi or viruses.',
    'non-infectious-diseases': 'Non-Infectious Diseases',
    'non-infectious-desc': 'Caused by environmental or nutritional factors.',
    
    'about-title': 'About MyPlant',
    'about-text': 'MyPlant is a simple and user-friendly platform designed to help plant lovers identify plants, understand their diseases, and learn the best care practices. Our goal is to make plant care easier by providing useful information such as plant identification, weather-based tips, reminders, and disease awareness. This project was developed as an educational frontend project, focusing on clean design, usability, and accessibility, using modern web technologies to create an enjoyable learning experience.',
    
    'footer-text': 'MyPlant – Botanist in your pocket',
    'footer-copyright': '© 2025 MyPlant . All rights reserved',
    
    // Community Page
    'community-title': 'Plant Community',
    'community-subtitle': 'Ask plant care questions, describe your plant problem, and contact agricultural support directly through WhatsApp',
    'community-join-title': 'Join Our Plant Community',
    'community-join-desc': 'Connect with plant lovers, ask questions, share your plant problems, and get support through WhatsApp.',
    'community-grow-title': 'Grow Together 🌿',
    'community-grow-desc': 'Our community helps users discuss plant care, diseases, watering schedules, sunlight needs, and daily plant tips.',
    'community-feature-care': 'Ask about plant diseases and care tips',
    'community-feature-photos': 'Share your plant photos with others',
    'community-feature-whatsapp': 'Get help directly through WhatsApp',
    'community-join-btn': 'Join WhatsApp Group',
    'community-form-title': 'Contact Community Admin',
    'community-form-note': 'Fill the form and send your question directly on WhatsApp.',
    'expert-title': 'Ask an Agricultural Expert',
    'expert-desc': 'Connect with plant experts through WhatsApp',
    'name-label': 'Your Name',
    'name-placeholder': 'Enter your name',
    'plant-type-label': 'Plant Type',
    'plant-type-placeholder': 'Example: Rose, Cactus, Mint...',
    'problem-label': 'Problem Type',
    'message-label': 'Your Message',
    'message-placeholder': 'Describe your plant problem...',
    'send-whatsapp': 'Send via WhatsApp',
    'whatsapp-note': 'This will open WhatsApp with your message ready to send.',
    'watering-problem': 'Watering problem',
    'yellow-leaves': 'Yellow leaves',
    'plant-disease': 'Plant disease',
    'sunlight-issue': 'Sunlight issue',
    'soil-fertilizer': 'Soil or fertilizer problem',
    'general-question': 'General question',
    'fill-all-fields': 'Please fill all fields',
    'choose-problem': 'Choose a problem',
    
    // Login/Signup
    'welcome-back': 'Welcome Back',
    'login-subtitle': 'Please login to your account',
    'email-label': 'Email Address',
    'email-placeholder': 'name@example.com',
    'password-label': 'Password',
    'password-placeholder': 'Enter your password',
    'remember-me': 'Remember me',
    'forgot-password': 'Forgot password?',
    'login-btn': 'Login',
    'no-account': 'Don\'t have an account?',
    'signup-link': 'Sign up',
    
    'create-account': 'Create Account',
    'signup-subtitle': 'Join MyPlant community',
    'full-name-label': 'Full Name',
    'full-name-placeholder': 'Your full name',
    'confirm-password-label': 'Confirm Password',
    'confirm-password-placeholder': 'Confirm your password',
    'have-account': 'Already have an account?',
    'signup-btn': 'Sign Up',
    
    // Plant AI
    'history-title': 'Plant History',
    'ai-title': 'Upload or capture a plant image for analysis',
    'start-camera': 'Start Camera',
    'capture-image': 'Capture Image',
    'choose-file': 'Choose File',
    
    // Reminder
    'care-time-title': 'Care Time',
    'care-time-desc': 'Never miss watering, sunlight, or plant care tasks again.',
    'create-task': 'Create Care Task',
    'task-subtitle': 'Choose a time and write the plant care task you want to follow.',
    'care-time-label': 'Care Time',
    'task-description': 'Task Description',
    'add-task': 'Add Task',
    'active-tasks': 'Active Tasks',
    'no-tasks': 'No tasks yet. Create one to get started!',
    'delete-btn': 'Delete',
    'login-for-reminders': 'Login to save and view reminders',
    
    // Weather
    'weather-tips': 'Weather & Plant Tips',
    'enter-city': 'Enter city name',
    'get-weather': 'Get Weather',
    'getting-location': 'Getting location...',
    'allow-location': 'Allow location or use city input above',
    'city-not-found': 'City not found',
    'browser-no-geolocation': 'Browser does not support geolocation',
    
    // Feedback
    'feedback-title': 'Feedback',
    'feedback-desc': 'Send complaints or suggestions so the admin can review user issues and improve the platform.',
    'feedback-center': 'Feedback Center',
    'feedback-subtitle': 'Share a complaint if something is not working, or send a suggestion to help improve MyPlant.',
    'complaint': 'Complaint',
    'suggestion': 'Suggestion',
    'complaint-category': 'Complaint Category',
    'suggestion-text': 'Suggestion Text',
    'submit': 'Submit',
    'admin-dashboard': 'Admin Dashboard',
    'my-feedback-title': 'My Feedback History',
    'my-feedback-subtitle': 'Track the status of your submitted complaints and suggestions.',
    'no-feedback-history': 'No feedback submitted yet.',
    'login-for-history': 'Login to view your feedback history',
    
    // Plant Nursery
    'nearest-nursery': 'Nearest Plant Nursery in Jordan',
    'find-nearby': 'Find nearby agricultural nurseries across Jordan',
    'search-placeholder': 'Search by nursery name, area, or plant type...',
    'no-nurseries': 'No nurseries found',

    // Infectious Diseases
    'back-btn': 'Back',
    'black-spot-title': '1. Black Spot Fungus',
    'black-spot-desc': 'Fungal disease causing circular black spots on rose leaves. Thrives in high humidity, leads to leaf drop. Treatment: Fungicides and pruning infected leaves.',
    'rust-disease-title': '2. Rust Disease',
    'rust-disease-desc': 'Orange powdery fungal infection on leaves. Spreads by wind and tools. Reduces photosynthesis. Treatment: Improve air circulation and fungicides.',
    'bacterial-spot-title': '3. Bacterial Leaf Spot',
    'bacterial-spot-desc': 'Small water-soaked spots turning brown. Spreads by water splash. Causes leaf holes. Treatment: Copper sprays and good ventilation.',

    // Non-Infectious Diseases
    'nitrogen-title': '1. Nitrogen Deficiency',
    'nitrogen-desc': 'Yellowing of older leaves starting from tips. Stunted growth and weak stems. Caused by poor soil nitrogen. Treatment: Apply nitrogen-rich fertilizers like urea.',
    'iron-title': '2. Iron Chlorosis',
    'iron-desc': 'Yellowing between leaf veins on young leaves while veins stay green. Common in alkaline soils. Treatment: Chelated iron sprays or soil acidification.',
    'water-stress-title': '3. Water Stress (Wilting)',
    'water-stress-desc': 'Drooping leaves and stems due to insufficient water or root damage. Leaves may appear dull. Treatment: Proper watering schedule and improve soil drainage.',

    // Admin Feedback
    'admin-feedback-title': 'Admin Feedback Dashboard',
    'admin-feedback-subtitle': 'Review complaints and suggestions submitted by users, classify issues, and follow up on improvement actions.',
    'admin-login-title': 'Admin Login',
    'admin-login-subtitle': 'Please login with your admin account to access the dashboard',
    'stat-total': 'Total Feedback',
    'stat-complaints': 'Complaints',
    'stat-suggestions': 'Suggestions',
    'stat-new': 'New Items',
    'filter-type': 'Type',
    'filter-status': 'Status',
    'filter-all': 'All',
    'filter-new': 'New',
    'filter-in-progress': 'In Progress',
    'filter-resolved': 'Resolved',
    'refresh-btn': 'Refresh',
    'feedback-form-link': 'Feedback Form',
    'col-id': 'ID',
    'col-type': 'Type',
    'col-category': 'Category',
    'col-title-details': 'Title & Details',
    'col-user': 'User',
    'col-status': 'Status',
    'col-created': 'Created At',

    // Feedback form
    'title-label': 'Title',
    'details-label': 'Details',

    // Plant AI page
    'identify-btn': 'Identify Plant',
    'drop-hint': 'Drop an image here or click to browse',
    'analyzing': 'Analyzing plant image...',
    'identification-results': 'Identification Results',
    'plant-info': 'Plant Information',
    'scientific-name': 'Scientific Name',
    'common-names': 'Common Names',
    'confidence': 'Confidence',
    'description': 'Description',
    'login-for-history': 'Login to view plant history',
    'no-history': 'No saved plants yet',

    // Care Guide
    'care-guide': 'Care Guide',
    'soil': 'Soil',
    'watering': 'Watering',
    'sunlight': 'Sunlight',
    'temperature': 'Temperature',
    'powered-by-gemini': 'Powered by Gemini AI',
    'weather-btn': 'Weather',

    // Watering Schedule
    'watering-schedule': 'Watering Schedule',
    'watering-schedules': 'Watering Schedules',
    'watering-schedules-title': 'Watering Schedule',
    'watering-schedules-desc': 'View your personalized AI-generated watering schedules for all your identified plants.',
    'want-schedule': 'Want a watering schedule?',
    'schedule-offer-desc': 'Get a personalized watering schedule for this plant generated by AI.',
    'create-schedule': 'Create Watering Schedule',
    'suggested-schedule': 'Suggested Schedule',
    'frequency': 'Frequency',
    'amount': 'Amount',
    'best-time': 'Best Time',
    'notes': 'Notes',
    'generating': 'Generating...',
    'accept': 'Accept',
    'decline': 'Decline',
    'schedule-saved': 'Schedule saved successfully!',
    'login-for-schedules': 'Please login to view your watering schedules',
    'no-schedules': 'No watering schedules yet',
    'no-schedules-desc': 'Identify a plant and create a watering schedule from the plant identification page.',
    'identify-plant': 'Identify a Plant',
    'error-loading': 'Error loading schedules',
  },
  
  ar: {
    // Navigation
    'nav-home': 'الرئيسية',
    'nav-plants': 'النباتات',
    'nav-diseases': 'الأمراض',
    'nav-community': 'المجتمع',
    'nav-about': 'عن التطبيق',
    'nav-feedback': 'الملاحظات',
    
    // Index Page
    'welcome-title': 'مرحبا بك في عالم النباتات!',
    'welcome-subtitle': 'منصة شاملة لتحديد النباتات واستكشاف أنواعها والعناية بها',
    'search-placeholder': 'ابحث عن نبات...',
    
    'special-title': 'ما يميز MyPlant',
    'care-time-title': 'وقت العناية',
    'care-time-desc': 'اضبط التذكيرات للري واستقبل إشعارات في الوقت المناسب لإبقاء نباتاتك صحية.',
    'plant-id-title': 'تحديد النبات',
    'plant-id-desc': 'غير متأكد من نوع النبات؟ استخدم الذكاء الاصطناعي لتحديده بسرعة والحصول على معلومات عنه',
    'weather-title': 'الطقس',
    'weather-desc': 'تحقق من الطقس بالقرب منك لتعديل جداول الري والعناية، خاصة في الأيام الحارة أو الممطرة أو العاصفة.',
    'nursery-title': 'مشتل النباتات',
    'nursery-desc': 'ابحث عن مشاتل النباتات القريبة منك في الأردن واكتشف أقرب مشتل إلى موقعك.',
    
    'explore-plants': 'استكشف النباتات',
    'see-more-plants': 'شاهد المزيد من النباتات',
    
    'plant-diseases': 'أمراض النباتات',
    'infectious-diseases': 'الأمراض المعدية',
    'infectious-desc': 'التي تسببها البكتيريا أو الفطريات أو الفيروسات.',
    'non-infectious-diseases': 'الأمراض غير المعدية',
    'non-infectious-desc': 'التي تسببها عوامل بيئية أو غذائية.',
    
    'about-title': 'عن MyPlant',
    'about-text': 'MyPlant منصة بسيطة وسهلة الاستخدام مصممة لمساعدة محبي النباتات على تحديد النباتات وفهم أمراضها وتعلم أفضل ممارسات العناية. هدفنا هو تسهيل العناية بالنباتات من خلال توفير معلومات مفيدة مثل تحديد النبات والنصائح المستندة إلى الطقس والتذكيرات والوعي بالأمراض. تم تطوير هذا المشروع كمشروع واجهة أمامية تعليمية، مع التركيز على التصميم النظيف وقابلية الاستخدام والإمكانية الوصولية، باستخدام تقنيات الويب الحديثة لإنشاء تجربة تعليمية ممتعة.',
    
    'footer-text': 'MyPlant - الخبير النباتي في جيبك',
    'footer-copyright': '© 2025 MyPlant . جميع الحقوق محفوظة',
    
    // Community Page
    'community-title': 'مجتمع النباتات',
    'community-subtitle': 'اطرح أسئلة العناية بالنباتات، صف مشكلة نبات، واتصل بدعم زراعي مباشر عبر واتساب',
    'community-join-title': 'انضم إلى مجتمعنا النباتي',
    'community-join-desc': 'تواصل مع عشاق النباتات، اطرح الأسئلة، شارك مشاكل نباتاتك، واحصل على الدعم عبر واتساب.',
    'community-grow-title': 'ننمو معاً 🌿',
    'community-grow-desc': 'يساعد مجتمعنا المستخدمين على مناقشة العناية بالنباتات والأمراض وجداول الري واحتياجات الضوء ونصائح النبات اليومية.',
    'community-feature-care': 'اسأل عن أمراض النباتات ونصائح العناية',
    'community-feature-photos': 'شارك صور نباتاتك مع الآخرين',
    'community-feature-whatsapp': 'احصل على المساعدة مباشرة عبر واتساب',
    'community-join-btn': 'انضم إلى مجموعة واتساب',
    'community-form-title': 'تواصل مع مشرف المجتمع',
    'community-form-note': 'املأ النموذج وأرسل سؤالك مباشرة على واتساب.',
    'expert-title': 'اطلب من خبير زراعي',
    'expert-desc': 'تواصل مع خبراء النباتات عبر واتساب',
    'name-label': 'اسمك',
    'name-placeholder': 'أدخل اسمك',
    'plant-type-label': 'نوع النبات',
    'plant-type-placeholder': 'مثال: ورد، صبار، نعناع...',
    'problem-label': 'نوع المشكلة',
    'message-label': 'رسالتك',
    'message-placeholder': 'صف مشكلة نبات...',
    'send-whatsapp': 'إرسال عبر واتساب',
    'whatsapp-note': 'سيفتح واتساب مع رسالتك جاهزة للإرسال.',
    'watering-problem': 'مشكلة في الري',
    'yellow-leaves': 'أوراق صفراء',
    'plant-disease': 'مرض النبات',
    'sunlight-issue': 'مشكلة الضوء',
    'soil-fertilizer': 'مشكلة التربة أو السماد',
    'general-question': 'سؤال عام',
    'fill-all-fields': 'يرجى ملء جميع الحقول',
    'choose-problem': 'اختر مشكلة',
    
    // Login/Signup
    'welcome-back': 'أهلا بعودتك',
    'login-subtitle': 'الرجاء تسجيل الدخول إلى حسابك',
    'email-label': 'عنوان البريد الإلكتروني',
    'email-placeholder': 'name@example.com',
    'password-label': 'كلمة المرور',
    'password-placeholder': 'أدخل كلمة المرور',
    'remember-me': 'تذكرني',
    'forgot-password': 'هل نسيت كلمة المرور؟',
    'login-btn': 'تسجيل الدخول',
    'no-account': 'ليس لديك حساب؟',
    'signup-link': 'اشترك الآن',
    
    'create-account': 'إنشاء حساب',
    'signup-subtitle': 'انضم إلى مجتمع MyPlant',
    'full-name-label': 'الاسم الكامل',
    'full-name-placeholder': 'اسمك الكامل',
    'confirm-password-label': 'تأكيد كلمة المرور',
    'confirm-password-placeholder': 'أكد كلمة المرور',
    'have-account': 'هل لديك حساب بالفعل؟',
    'signup-btn': 'إنشاء حساب',
    
    // Plant AI
    'history-title': 'سجل النباتات',
    'ai-title': 'ارفع أو التقط صورة للنبات ليتم تحليله',
    'start-camera': 'تشغيل الكاميرا',
    'capture-image': 'التقاط الصورة',
    'choose-file': 'اختر ملف',
    
    // Reminder
    'care-time-title': 'وقت العناية',
    'care-time-desc': 'لا تفوت أي مهمة عناية بالنبات مرة أخرى.',
    'create-task': 'إنشاء مهمة عناية',
    'task-subtitle': 'اختر الوقت واكتب مهمة العناية بالنبات التي تريد متابعتها.',
    'care-time-label': 'وقت العناية',
    'task-description': 'وصف المهمة',
    'add-task': 'إضافة مهمة',
    'active-tasks': 'المهام النشطة',
    'no-tasks': 'لا توجد مهام بعد. أنشئ واحدة للبدء!',
    'delete-btn': 'حذف',
    'login-for-reminders': 'سجل الدخول لحفظ وعرض التذكيرات',
    
    // Weather
    'weather-tips': 'نصائح الطقس والنبات',
    'enter-city': 'أدخل اسم المدينة',
    'get-weather': 'الحصول على الطقس',
    'getting-location': 'جاري الحصول على الموقع...',
    'allow-location': 'السماح بالموقع أو استخدم إدخال المدينة أعلاه',
    'city-not-found': 'المدينة غير موجودة',
    'browser-no-geolocation': 'المتصفح لا يدعم تحديد الموقع الجغرافي',
    
    // Feedback
    'feedback-title': 'الملاحظات',
    'feedback-desc': 'أرسل شكاوى أو اقتراحات ليتمكن المسؤول من مراجعة مشكلات المستخدمين وتحسين المنصة.',
    'feedback-center': 'مركز التعليقات',
    'feedback-subtitle': 'شارك شكوى إذا كان هناك خطأ ما، أو أرسل اقتراح لمساعدة MyPlant على التحسن.',
    'complaint': 'شكوى',
    'suggestion': 'اقتراح',
    'complaint-category': 'فئة الشكوى',
    'suggestion-text': 'نص الاقتراح',
    'submit': 'إرسال',
    'admin-dashboard': 'لوحة المسؤول',
    'my-feedback-title': 'سجل ملاحظاتي',
    'my-feedback-subtitle': 'تتبع حالة الشكاوى والاقتراحات التي قدمتها.',
    'no-feedback-history': 'لم يتم تقديم ملاحظات بعد.',
    'login-for-history': 'سجل الدخول لعرض سجل ملاحظاتك',
    
    // Plant Nursery
    'nearest-nursery': 'أقرب مشتل للنباتات في الأردن',
    'find-nearby': 'ابحث عن المشاتل الزراعية القريبة منك في الأردن',
    'search-placeholder': 'ابحث باسم المشتل أو المنطقة أو نوع النبات...',
    'no-nurseries': 'لم يتم العثور على مشاتل',

    // Infectious Diseases
    'back-btn': 'رجوع',
    'black-spot-title': '1. فطر البقعة السوداء',
    'black-spot-desc': 'مرض فطري يسبب بقع سوداء دائرية على أوراق الورد. يزدهر في الرطوبة العالية ويؤدي إلى تساقط الأوراق. العلاج: مبيدات فطرية وتقليم الأوراق المصابة.',
    'rust-disease-title': '2. مرض الصدأ',
    'rust-disease-desc': 'عدوى فطرية بودرة برتقالية على الأوراق. تنتشر عن طريق الرياح والأدوات. تقلل من التمثيل الضوئي. العلاج: تحسين دوران الهواء والمبيدات الفطرية.',
    'bacterial-spot-title': '3. تبقع الأوراق البكتيري',
    'bacterial-spot-desc': 'بقع صغيرة مبللة بالماء تتحول إلى اللون البني. تنتشر برذاذ الماء. تسبب ثقوباً في الأوراق. العلاج: رش النحاس والتهوية الجيدة.',

    // Non-Infectious Diseases
    'nitrogen-title': '1. نقص النيتروجين',
    'nitrogen-desc': 'اصفرار الأوراق القديمة بدءاً من الأطراف. تأخر النمو وضعف السيقان. بسبب نقص النيتروجين في التربة. العلاج: استخدام أسمدة غنية بالنيتروجين مثل اليوريا.',
    'iron-title': '2. نقص الحديد',
    'iron-desc': 'اصفرار بين عروق الأوراق على الأوراق الصغيرة بينما تبقى العروق خضراء. شائع في التربة القلوية. العلاج: رش الحديد المخلب أو تحمض التربة.',
    'water-stress-title': '3. الإجهاد المائي',
    'water-stress-desc': 'تدلي الأوراق والسيقان بسبب نقص الماء أو تلف الجذور. قد تظهر الأوراق باهتة. العلاج: جدول ري مناسب وتحسين تصريف التربة.',

    // Admin Feedback
    'admin-feedback-title': 'لوحة تحكم الملاحظات',
    'admin-feedback-subtitle': 'مراجعة الشكاوى والاقتراحات المقدمة من المستخدمين، تصنيف المشكلات، ومتابعة إجراءات التحسين.',
    'admin-login-title': 'تسجيل دخول المسؤول',
    'admin-login-subtitle': 'الرجاء تسجيل الدخول بحساب المسؤول للوصول إلى لوحة التحكم',
    'stat-total': 'إجمالي الملاحظات',
    'stat-complaints': 'الشكاوى',
    'stat-suggestions': 'الاقتراحات',
    'stat-new': 'الجديدة',
    'filter-type': 'النوع',
    'filter-status': 'الحالة',
    'filter-all': 'الكل',
    'filter-new': 'جديد',
    'filter-in-progress': 'قيد المعالجة',
    'filter-resolved': 'تم الحل',
    'refresh-btn': 'تحديث',
    'feedback-form-link': 'نموذج الملاحظات',
    'col-id': 'الرقم',
    'col-type': 'النوع',
    'col-category': 'التصنيف',
    'col-title-details': 'العنوان والتفاصيل',
    'col-user': 'المستخدم',
    'col-status': 'الحالة',
    'col-created': 'تاريخ الإنشاء',

    // Feedback form
    'title-label': 'العنوان',
    'details-label': 'التفاصيل',

    // Plant AI page
    'identify-btn': 'تحديد النبات',
    'drop-hint': 'أسقط الصورة هنا أو انقر للتصفح',
    'analyzing': 'جاري تحليل الصورة...',
    'identification-results': 'نتائج التحديد',
    'plant-info': 'معلومات النبات',
    'scientific-name': 'الاسم العلمي',
    'common-names': 'الأسماء الشائعة',
    'confidence': 'نسبة الثقة',
    'description': 'الوصف',
    'login-for-history': 'سجل الدخول لعرض سجل النباتات',
    'no-history': 'لا توجد نباتات محفوظة بعد',

    // Care Guide
    'care-guide': 'دليل العناية',
    'soil': 'التربة',
    'watering': 'الري',
    'sunlight': 'الإضاءة',
    'temperature': 'درجة الحرارة',
    'powered-by-gemini': 'مدعوم من Gemini AI',
    'weather-btn': 'الطقس',

    // Watering Schedule
    'watering-schedule': 'جدول الري',
    'watering-schedules': 'جداول الري',
    'watering-schedules-title': 'جدول الري',
    'watering-schedules-desc': 'عرض جداول الري المخصصة التي تم إنشاؤها بالذكاء الاصطناعي لجميع نباتاتك المحددة.',
    'want-schedule': 'هل تريد جدول ري؟',
    'schedule-offer-desc': 'احصل على جدول ري مخصص لهذا النبات تم إنشاؤه بواسطة الذكاء الاصطناعي.',
    'create-schedule': 'إنشاء جدول الري',
    'suggested-schedule': 'الجدول المقترح',
    'frequency': 'التكرار',
    'amount': 'الكمية',
    'best-time': 'أفضل وقت',
    'notes': 'ملاحظات',
    'generating': 'جاري الإنشاء...',
    'accept': 'قبول',
    'decline': 'رفض',
    'schedule-saved': 'تم حفظ جدول الري بنجاح!',
    'login-for-schedules': 'الرجاء تسجيل الدخول لعرض جداول الري الخاصة بك',
    'no-schedules': 'لا توجد جداول ري بعد',
    'no-schedules-desc': 'حدد نباتاً وأنشئ جدول ري من صفحة تحديد النبات.',
    'identify-plant': 'تحديد نبات',
    'error-loading': 'خطأ في تحميل الجداول',
  }
};

// Get translation
function t(key, lang = null) {
  const currentLang = lang || localStorage.getItem('appLanguage') || 'en';
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

// Translate all elements with data-translate attribute
function translatePage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    const text = t(key, lang);
    
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else if (el.tagName === 'OPTION') {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });
}
