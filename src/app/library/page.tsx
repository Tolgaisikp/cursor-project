'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiBookmark, FiArchive, FiClock, FiTrash2, FiRotateCcw } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('saved');
  
  // Mock data for different sections
  const savedBlogs = MOCK_BLOGS.slice(0, 3);
  const archivedBlogs = MOCK_BLOGS.slice(3, 6).map(blog => ({
    ...blog,
    archivedDate: '28 Aralık 2023'
  }));
  const historyBlogs = MOCK_BLOGS.slice(6, 9).map(blog => ({
    ...blog,
    readDate: '27 Aralık 2023'
  }));

  const renderContent = () => {
    switch (activeTab) {
      case 'saved':
        return (
          <div className="space-y-6">
            {savedBlogs.length > 0 ? (
              savedBlogs.map((blog) => (
                <div key={blog.id} className="relative bg-white rounded-lg shadow-sm p-6">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      title="Arşive ekle"
                    >
                      <FiArchive className="text-gray-600" />
                    </button>
                  </div>
                  <BlogCard {...blog} />
                </div>
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
        );
      
      case 'archive':
        return (
          <div className="space-y-6">
            {archivedBlogs.length > 0 ? (
              archivedBlogs.map((blog) => (
                <div key={blog.id} className="relative bg-white rounded-lg shadow-sm p-6">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      title="Arşivden çıkar"
                    >
                      <FiRotateCcw className="text-gray-600" />
                    </button>
                    <button 
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      title="Sil"
                    >
                      <FiTrash2 className="text-gray-600" />
                    </button>
                  </div>
                  <BlogCard {...blog} />
                  <div className="mt-4 text-sm text-gray-500 text-right">
                    Arşivlenme: {blog.archivedDate}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiArchive className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Arşivlenmiş yazı yok</h3>
                <p className="text-gray-500">
                  Kaydettiğiniz yazıları arşivleyerek düzenli tutabilirsiniz.
                </p>
              </div>
            )}
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            {historyBlogs.length > 0 ? (
              historyBlogs.map((blog) => (
                <div key={blog.id} className="relative bg-white rounded-lg shadow-sm p-6">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      title="Kaydet"
                    >
                      <FiBookmark className="text-gray-600" />
                    </button>
                  </div>
                  <BlogCard {...blog} />
                  <div className="mt-4 text-sm text-gray-500 text-right">
                    Okunma: {blog.readDate}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiClock className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Okuma geçmişi boş</h3>
                <p className="text-gray-500">
                  Okuduğunuz yazılar burada görünecek.
                </p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

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
                { label: 'Kaydedilenler', icon: FiBookmark, value: 'saved' },
                { label: 'Arşiv', icon: FiArchive, value: 'archive' },
                { label: 'Geçmiş', icon: FiClock, value: 'history' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`pb-4 px-2 flex items-center gap-2 ${
                    activeTab === tab.value
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

          {/* İçerik */}
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}