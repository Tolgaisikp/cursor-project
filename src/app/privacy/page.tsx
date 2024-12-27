'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Kişisel Verilerin Korunması</h2>
              <p className="text-gray-600 leading-relaxed">
                Blog platformumuzda gizliliğinize önem veriyoruz. Bu gizlilik politikası, 
                kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Toplanan Veriler</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Ad ve soyadı bilgileri</li>
                <li>E-posta adresi</li>
                <li>Profil fotoğrafı</li>
                <li>Blog yazıları ve yorumlar</li>
                <li>Kullanım istatistikleri</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Çerezler</h2>
              <p className="text-gray-600 leading-relaxed">
                Sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. 
                Bu çerezler, oturum bilgilerinizi hatırlamak ve site kullanımını analiz etmek için kullanılır.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Veri Güvenliği</h2>
              <p className="text-gray-600 leading-relaxed">
                Kişisel verileriniz, endüstri standardı güvenlik önlemleriyle korunmaktadır. 
                Verileriniz şifrelenerek saklanır ve yetkisiz erişime karşı korunur.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Veri Paylaşımı</h2>
              <p className="text-gray-600 leading-relaxed">
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. 
                Verileriniz sadece hizmet kalitesini artırmak için kullanılır.
              </p>
            </section>

            <section className="space-y-4 border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-500">
                Son güncelleme: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 