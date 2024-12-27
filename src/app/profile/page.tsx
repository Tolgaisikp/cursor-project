'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { FiEdit2, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          {/* Profil Başlığı */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src="/default-avatar.png"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FiEdit2 className="text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">Kullanıcı Adı</h1>
                  <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50">
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiGithub className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Stories', value: '23' },
              { label: 'Followers', value: '1.2K' },
              { label: 'Following', value: '348' },
              { label: 'Total Views', value: '45.3K' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Sekmeler */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { label: 'Stories', active: true },
                { label: 'About', active: false },
                { label: 'Featured', active: false },
              ].map((tab) => (
                <button
                  key={tab.label}
                  className={`pb-4 px-2 ${
                    tab.active
                      ? 'border-b-2 border-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
            Henüz bir hikaye paylaşılmadı.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 