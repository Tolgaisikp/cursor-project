'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogCard from '../../../components/BlogCard';
import { getBlogsByCategory } from '../../../data/blogs';

const CATEGORY_TITLES = {
  technology: 'Teknoloji',
  software: 'Yazılım',
  design: 'Tasarım',
  productivity: 'Verimlilik'
} as const;

type CategoryType = keyof typeof CATEGORY_TITLES;

export default function CategoryPage() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  // Kategoriye göre blogları al
  const blogs = getBlogsByCategory(params.slug as CategoryType);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Mevcut sayfadaki blogları al
  const currentBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">{CATEGORY_TITLES[params.slug as CategoryType]}</h1>
            <span className="text-gray-500">{blogs.length} blog yazısı</span>
          </div>

          <div className="space-y-6">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Bu kategoride henüz blog yazısı bulunmuyor.
              </div>
            )}
          </div>

          {/* Pagination */}
          {blogs.length > blogsPerPage && (
            <div className="flex justify-center gap-2 my-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded transition-colors ${
                    currentPage === i + 1
                      ? 'bg-[#333333] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 