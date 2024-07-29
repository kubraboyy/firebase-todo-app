"use client"; // Bileşenin istemci tarafında çalışacağını belirtir

import { useState, useEffect } from 'react'; // React'tan gerekli modülleri içe aktarıyoruz
import { useRouter } from 'next/navigation'; // Next.js'in yönlendirme fonksiyonunu içe aktarıyoruz
import { signOut } from 'firebase/auth'; // Firebase'den çıkış yapma fonksiyonunu içe aktarıyoruz
import { auth } from '../../firebase'; // Firebase kimlik doğrulama nesnesini içe aktarıyoruz
import { onAuthStateChanged } from 'firebase/auth'; // Firebase'den kimlik doğrulama durumunu kontrol eden fonksiyonu içe aktarıyoruz

const Home = () => {
  const [user, setUser] = useState<any>(null); // Kullanıcı durumunu tutmak için bir state oluşturuyoruz
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutmak için bir state oluşturuyoruz
  const [activeTab, setActiveTab] = useState('completed'); // Aktif tabı tutmak için bir state oluşturuyoruz
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
    setLoading(true); // Yüklenme durumunu başlatıyoruz
    try {
      await signOut(auth); // Kullanıcıyı çıkış yaptırıyoruz
      router.push('/register'); // Çıkış yaptıktan sonra kayıt sayfasına yönlendiriyoruz
    } catch (error) {
      console.error('Sign out error:', error); // Çıkış yapma hatasını konsola yazdırıyoruz
      setLoading(false); // Yüklenme durumunu sonlandırıyoruz
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Yüklenme durumu
  }

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">To Do App</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('completed')}>Completed</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeTab === 'incomplete' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('incomplete')}>Incomplete</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Hi!</h1>
          <p className="text-center">Welcome to the app!</p>
          <button className="btn btn-danger w-100" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          {activeTab === 'completed' ? (
            <div>Completed content goes here...</div>
          ) : (
            <div>Incomplete content goes here...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; // Bileşeni dışa aktarıyoruz
