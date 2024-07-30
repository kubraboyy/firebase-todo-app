"use client";

// Gerekli kütüphaneleri import ediyoruz
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Register = () => {
  // State değişkenlerini tanımlıyoruz
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutmak için bir state oluşturuyoruz
  const [rememberMe, setRememberMe] = useState(false); // "Beni Hatırla" durumunu tutmak için bir state oluşturuyoruz
  const router = useRouter();

  // Kullanıcı oturum açtığında ana sayfaya yönlendirme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Email doğrulama fonksiyonu
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Kayıt işlemi fonksiyonu
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Yüklenme durumunu başlatıyoruz
  
    // Email doğrulama
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // Yüklenme durumunu sonlandırıyoruz
      return;
    }
  
    // Şifre uzunluğu kontrolü
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false); // Yüklenme durumunu sonlandırıyoruz
      return;
    }
  
    try {
      // Firebase ile kullanıcı oluşturma
      await createUserWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      router.push('/login');
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
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
          <h1 className="text-center">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Name Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <button
                  className="btn btn-link"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
