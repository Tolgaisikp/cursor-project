'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <h1 className="text-4xl font-bold mb-8">Hakkımızda</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Misyon ve Vizyon */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Teknoloji ve yazılım dünyasındaki en güncel bilgileri, deneyimleri ve içgörüleri paylaşarak 
                topluluk üyelerimizin gelişimine katkıda bulunmayı amaçlıyoruz.
              </p>
            </section>

            {/* Ekip */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Ekibimiz</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', image: '/default-avatar.png' },
                  { name: 'Mehmet Demir', role: 'Baş Editör', image: '/default-avatar.png' },
                  { name: 'Ayşe Kaya', role: 'İçerik Yöneticisi', image: '/default-avatar.png' },
                ].map((member) => (
                  <div key={member.name} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* İstatistikler */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-gray-100">
              {[
                { label: 'Aktif Kullanıcı', value: '10K+' },
                { label: 'Yayınlanan Blog', value: '5000+' },
                { label: 'Toplam Okunma', value: '1M+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 