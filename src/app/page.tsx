'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { MOCK_BLOGS } from '../data/blogs';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const blogsPerPage = 10;

  // Blogları filtrele
  const filteredBlogs = MOCK_BLOGS.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Mevcut sayfadaki blogları al
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  // Arama yapıldığında ilk sayfaya dön
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="space-y-6 mt-8">
            {currentBlogs.length > 0 ? (
              currentBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Aradığınız kriterlere uygun blog bulunamadı.
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredBlogs.length > blogsPerPage && (
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