"use client"; // Bileşenin istemci tarafında çalışacağını belirtir

import { useState, useEffect } from "react"; // React'tan gerekli modülleri içe aktarıyoruz
import { useRouter } from "next/navigation"; // Next.js'in yönlendirme fonksiyonunu içe aktarıyoruz
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase'den e-posta ve şifre ile giriş yapma fonksiyonunu içe aktarıyoruz
import { auth } from "../../firebase"; // Firebase kimlik doğrulama nesnesini içe aktarıyoruz
import { onAuthStateChanged } from "firebase/auth"; // Firebase'den kimlik doğrulama durumunu kontrol eden fonksiyonu içe aktarıyoruz

const Login = () => {
  const [email, setEmail] = useState(""); // E-posta adresini tutmak için bir state oluşturuyoruz
  const [password, setPassword] = useState(""); // Şifreyi tutmak için bir state oluşturuyoruz
  const [error, setError] = useState(""); // Hata mesajını tutmak için bir state oluşturuyoruz
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutmak için bir state oluşturuyoruz
  const router = useRouter(); // Next.js yönlendirme fonksiyonunu kullanıyoruz

  useEffect(() => {
    // Bileşen yüklendiğinde kullanıcı kimlik doğrulamasını kontrol ediyoruz
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Kullanıcı oturumu varsa ana sayfaya yönlendiriyoruz
      }
    });

    // localStorage'dan email ve password bilgilerini alıyoruz
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }

    return () => unsubscribe(); // onAuthStateChanged fonksiyonunu temizliyoruz
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Formun varsayılan submit davranışını engelliyoruz
    setLoading(true); // Yüklenme durumunu başlatıyoruz
    try {
      await signInWithEmailAndPassword(auth, email, password); // Kullanıcıyı e-posta ve şifre ile giriş yaptırıyoruz
      router.push("/"); // Giriş yaptıktan sonra ana sayfaya yönlendiriyoruz
    } catch (error) {
      console.error(error); // Hata durumunda hatayı konsola yazdırıyoruz
      setError("Login failed. Please try again."); // Hata mesajını state'e kaydediyoruz
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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleLogin}>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Hata mesajını gösteriyoruz */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div className="text-center mt-3">
              <p>
                Do not have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => router.push("/register")}
                >
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; // Bileşeni dışa aktarıyoruz
