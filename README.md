To-Do List Web App
Bu proje, kullanıcıların görevlerini yönetmelerine olanak tanıyan bir To-Do List web uygulamasıdır. Uygulama, TypeScript, Firebase, Next.js ve Bootstrap kullanılarak geliştirilmiştir. Kullanıcılar, tamamlanmamış ve tamamlanmış görevlerini iki ayrı tabloda görüntüleyebilirler. Tamamlanan görevler, tamamlanmamışlar tablosundan tamamlanmışlar tablosuna taşınır.

<h1>Özellikler</h1>
Kullanıcı hesabı oluşturma: Kullanıcı, mail ve şifreyle bir hesap oluşturup giriş yapabilir.
Görev Ekleme: Kullanıcılar yeni görevler ekleyebilir.
Görev Tamamlama: Kullanıcılar görevleri tamamlandığında işaretleyebilir.
Görev Düzenleme: Kullanıcı yazdığı görevi düzenleyebilir.
Görev Silme: Kullanıcılar görevleri silebilir.
Görevleri Görüntüleme: Tamamlanmamış ve tamamlanmış görevler ayrı tablolarda görüntülenir.

<h1>Kullanılan Teknolojiler</h1>
TypeScript: Güvenli ve ölçeklenebilir kod yazmak için kullanıldı.
Firebase: Gerçek zamanlı veritabanı ve kimlik doğrulama için kullanıldı.
Next.js: React tabanlı framework, sunucu tarafı render ve statik site oluşturma için kullanıldı.
Bootstrap: Kullanıcı arayüzü bileşenleri ve stil için kullanıldı.

<h1>Kurulum</h1>
1. Depoyu Klonlayın 
'''bash
git clone https://github.com/kullanici-adi/to-do-list-web-app.git
cd to-do-list-web-app

Bağımlılıkları Yükleyin:
npm install

Firebase Yapılandırması:
Firebase projesi oluşturun ve yapılandırma bilgilerini alın.
.env dosyasına Firebase yapılandırma bilgilerini ekleyin:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Uygulamayı Başlatın:
npm run dev

Kullanım
Görev Ekleme: Ana sayfada bulunan formu kullanarak yeni görev ekleyin.
Görev Tamamlama: Görevin yanındaki tamamla butonuna tıklayarak görevi tamamlayın.
Görev Silme: Görevin yanındaki sil butonuna tıklayarak görevi silin.
Görevleri Görüntüleme: Tamamlanmamış ve tamamlanmış görevler ayrı tablolarda görüntülenir.
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
