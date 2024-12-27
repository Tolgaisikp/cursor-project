'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import { getBlogById } from '../../../data/blogs';

export default function BlogDetail() {
  const router = useRouter();
  const params = useParams();
  const blog = getBlogById(params.id as string);

  // Blog bulunamazsa ana sayfaya yönlendir
  useEffect(() => {
    if (!blog) {
      router.push('/');
    }
  }, [blog, router]);

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto pt-20 px-4">
        {/* Yazar Bilgisi */}
        <div className="flex items-center gap-4 my-8">
          <Image
            src={blog.author.image}
            alt={blog.author.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium">{blog.author.name}</h3>
            <p className="text-gray-500 text-sm">
              {new Date(blog.publishDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Blog İçeriği */}
        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          
          {/* Kapak Fotoğrafı */}
          <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="whitespace-pre-line">{blog.content}</div>
        </article>

        {/* Etkileşim Butonları */}
        <div className="flex items-center justify-between py-8 border-t border-gray-200 mt-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
              <FiHeart className="text-xl" />
              <span>{blog.likes}</span>
            </button>
            
            <button className="text-gray-600 hover:text-blue-500">
              <FiBookmark className="text-xl" />
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Kategori: {blog.category}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 