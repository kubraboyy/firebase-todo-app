"use client"; // Bileşenin istemci tarafında çalışacağını belirtir
import { useEffect, ReactNode } from 'react'; // React'tan gerekli modülleri içe aktarıyoruz
import { useRouter } from 'next/navigation'; // Next.js'in yönlendirme fonksiyonunu içe aktarıyoruz
import { onAuthStateChanged } from 'firebase/auth'; // Firebase'den kimlik doğrulama durumunu kontrol eden fonksiyonu içe aktarıyoruz
import { auth } from '../../firebase'; // Firebase kimlik doğrulama nesnesini içe aktarıyoruz

interface PrivateRouteProps {
    children: ReactNode; // children prop'unun tipini tanımlıyoruz
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter(); // Next.js yönlendirme fonksiyonunu kullanıyoruz

    useEffect(() => {
        // Bileşen yüklendiğinde kullanıcı kimlik doğrulamasını kontrol ediyoruz
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login'); // Kullanıcı oturumu yoksa giriş sayfasına yönlendiriyoruz
            }
        });

        return () => unsubscribe(); // onAuthStateChanged fonksiyonunu temizliyoruz
    }, [router]);

    return <>{children}</>; // children prop'unu render ediyoruz
};

export default PrivateRoute; // Bileşeni dışa aktarıyoruz
