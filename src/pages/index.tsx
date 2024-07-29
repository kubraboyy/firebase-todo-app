"use client"; // Bileşenin istemci tarafında çalışacağını belirtir

import { useState, useEffect } from 'react'; // React'tan gerekli modülleri içe aktarıyoruz
import { useRouter } from 'next/navigation'; // Next.js'in yönlendirme fonksiyonunu içe aktarıyoruz
import { signOut } from 'firebase/auth'; // Firebase'den çıkış yapma fonksiyonunu içe aktarıyoruz
import { auth } from '../../firebase'; // Firebase kimlik doğrulama nesnesini içe aktarıyoruz
import { onAuthStateChanged } from 'firebase/auth'; // Firebase'den kimlik doğrulama durumunu kontrol eden fonksiyonu içe aktarıyoruz

const Home = () => {
  const [user, setUser] = useState<any>(null); // Kullanıcı durumunu tutmak için bir state oluşturuyoruz
  const router = useRouter(); // Next.js yönlendirme fonksiyonunu kullanıyoruz

  useEffect(() => {
    // Bileşen yüklendiğinde kullanıcı kimlik doğrulamasını kontrol ediyoruz
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Kullanıcı oturumu yoksa giriş sayfasına yönlendiriyoruz
      } else {
        setUser(user); // Kullanıcı oturumu varsa kullanıcı bilgisini state'e kaydediyoruz
      }
    });

    return () => unsubscribe(); // onAuthStateChanged fonksiyonunu temizliyoruz
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Kullanıcıyı çıkış yaptırıyoruz
      router.push('/register'); // Çıkış yaptıktan sonra kayıt sayfasına yönlendiriyoruz
    } catch (error) {
      console.error('Sign out error:', error); // Çıkış yapma hatasını konsola yazdırıyoruz
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Hi!</h1>
          <p className="text-center">Welcome to the app!</p>
          <button className="btn btn-danger w-100" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; // Bileşeni dışa aktarıyoruz
