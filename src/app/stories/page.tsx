'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiEdit2, FiFileText } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';
import Link from 'next/link';

export default function StoriesPage() {
  // İlk 5 blogu göster
  const myStories = MOCK_BLOGS.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Hikayelerim</h1>
            <Link href="/write">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-full hover:bg-[#222222]">
                <FiEdit2 className="text-lg" />
                <span>Yeni Hikaye</span>
              </button>
            </Link>
          </div>

          {/* Sekmeler */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { label: 'Yayınlananlar', active: true },
                { label: 'Taslaklar', active: false },
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

          {/* Hikayeler Listesi */}
          <div className="space-y-6">
            {myStories.length > 0 ? (
              myStories.map((blog) => (
                <div key={blog.id} className="relative">
                  <BlogCard {...blog} />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <FiEdit2 className="text-gray-600" />
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiFileText className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Henüz bir hikaye yazmadınız</h3>
                <p className="text-gray-500 mb-6">
                  İlk hikyenizi yazarak başlayın.
                </p>
                <Link href="/write">
                  <button className="px-6 py-3 bg-[#333333] text-white rounded-full hover:bg-[#222222]">
                    Hikaye Yaz
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 