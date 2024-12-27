'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiBookmark, FiArchive, FiClock } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';

export default function LibraryPage() {
  // İlk 5 blogu göster
  const savedBlogs = MOCK_BLOGS.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <h1 className="text-4xl font-bold mb-8">Kütüphane</h1>

          {/* Sekmeler */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { label: 'Kaydedilenler', icon: FiBookmark, active: true },
                { label: 'Arşiv', icon: FiArchive, active: false },
                { label: 'Geçmiş', icon: FiClock, active: false },
              ].map((tab) => (
                <button
                  key={tab.label}
                  className={`pb-4 px-2 flex items-center gap-2 ${
                    tab.active
                      ? 'border-b-2 border-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="text-lg" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Kaydedilen Bloglar */}
          <div className="space-y-6">
            {savedBlogs.length > 0 ? (
              savedBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiBookmark className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Henüz bir şey kaydetmediniz</h3>
                <p className="text-gray-500">
                  İlginizi çeken yazıları kaydedin ve daha sonra okuyun.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 