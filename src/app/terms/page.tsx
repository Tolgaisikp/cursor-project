'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <h1 className="text-4xl font-bold mb-8">Kullanım Şartları</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Genel Kurallar</h2>
              <p className="text-gray-600 leading-relaxed">
                Blog platformumuzu kullanarak aşağıdaki şartları kabul etmiş olursunuz. 
                Bu şartlar, platformun güvenli ve verimli kullanımını sağlamak için oluşturulmuştur.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Kullanıcı Sorumlulukları</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Doğru ve güncel bilgiler paylaşmak</li>
                <li>Telif haklarına saygı göstermek</li>
                <li>Diğer kullanıcılara saygılı davranmak</li>
                <li>Spam ve zararlı içeriklerden kaçınmak</li>
                <li>Platform güvenliğini tehdit etmemek</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">İçerik Politikası</h2>
              <p className="text-gray-600 leading-relaxed">
                Paylaşılan içerikler özgün olmalı ve telif haklarına uygun olmalıdır. 
                Platformumuz, uygunsuz içerikleri kaldırma ve hesapları askıya alma hakkını saklı tutar.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Hesap Güvenliği</h2>
              <p className="text-gray-600 leading-relaxed">
                Hesap güvenliğinizden siz sorumlusunuz. Güçlü bir şifre kullanmanız ve 
                hesap bilgilerinizi kimseyle paylaşmamanız önerilir.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Değişiklikler</h2>
              <p className="text-gray-600 leading-relaxed">
                Platform, kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                Güncel şartlar için bu sayfayı düzenli olarak kontrol etmeniz önerilir.
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