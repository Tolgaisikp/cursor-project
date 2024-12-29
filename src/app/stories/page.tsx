'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiEdit2, FiFileText, FiTrash2, FiEye } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';
import Link from 'next/link';

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState('published');

  // Mock data
  const publishedStories = MOCK_BLOGS.slice(0, 3);
  const draftStories = [
    {
      id: 'draft-1',
      title: 'React Performance Optimizasyonu',
      summary: 'React uygulamalarında performans optimizasyonu teknikleri ve best practices.',
      publishDate: '29 Aralık 2023',
      readTime: 8,
      author: {
        name: 'John Doe',
        image: '/image.webp'
      },
      coverImage: '/image.webp',
      isDraft: true,
      lastEdited: '2 saat önce'
    },
    {
      id: 'draft-2',
      title: 'Modern CSS Teknikleri',
      summary: 'CSS Grid, Flexbox ve modern CSS özelliklerinin detaylı kullanımı.',
      publishDate: '28 Aralık 2023',
      readTime: 6,
      author: {
        name: 'John Doe',
        image: '/image.webp'
      },
      coverImage: '/image.webp',
      isDraft: true,
      lastEdited: '1 gün önce'
    }
  ];

  const renderContent = () => {
    const stories = activeTab === 'published' ? publishedStories : draftStories;

    if (stories.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiFileText className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">
            {activeTab === 'published' 
              ? 'Henüz bir hikaye yazmadınız'
              : 'Taslak bulunamadı'}
          </h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'published'
              ? 'İlk hikyenizi yazarak başlayın.'
              : 'Yeni bir hikaye yazarak taslak oluşturun.'}
          </p>
          <Link href="/write">
            <button className="px-6 py-3 bg-[#333333] text-white rounded-full hover:bg-[#222222]">
              Hikaye Yaz
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {stories.map((blog) => (
          <div key={blog.id} className="relative bg-white rounded-lg shadow-sm p-6">
            <div className="absolute top-4 right-4 flex gap-2">
              {blog.isDraft ? (
                <>
                  <Link href={`/write?draft=${blog.id}`}>
                    <button 
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                      title="Düzenle"
                    >
                      <FiEdit2 className="text-gray-600" />
                    </button>
                  </Link>
                  <button 
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    title="Önizle"
                  >
                    <FiEye className="text-gray-600" />
                  </button>
                  <button 
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    title="Sil"
                  >
                    <FiTrash2 className="text-gray-600" />
                  </button>
                </>
              ) : (
                <Link href={`/write?edit=${blog.id}`}>
                  <button 
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    title="Düzenle"
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                </Link>
              )}
            </div>
            <BlogCard 
              id={blog.id}
              author={blog.author}
              title={blog.title}
              summary={blog.summary}
              publishDate={blog.publishDate}
              likes={0}
              coverImage={blog.coverImage}
            />
            {blog.isDraft && (
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Taslak
                </span>
                <span>Son düzenleme: {blog.lastEdited}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

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
                { label: 'Yayınlananlar', value: 'published' },
                { label: 'Taslaklar', value: 'drafts' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`pb-4 px-2 ${
                    activeTab === tab.value
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
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}