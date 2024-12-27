'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import ImageModal from '../../../components/ImageModal';
import { FiHeart, FiBookmark, FiShare2 } from 'react-icons/fi';

interface Blog {
  id: string;
  author: {
    name: string;
    image: string;
    bio: string;
  };
  title: string;
  coverImage: string;
  content: string;
  publishDate: string;
  likes: number;
}

interface BlogDetailClientProps {
  blog: Blog;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
            <p className="text-gray-500 text-sm">{blog.author.bio}</p>
          </div>
        </div>

        {/* Blog İçeriği */}
        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          
          {/* Kapak Fotoğrafı */}
          <div 
            className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
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

          <button className="text-gray-600 hover:text-gray-800">
            <FiShare2 className="text-xl" />
          </button>
        </div>
      </main>

      {/* Resim Modalı */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={blog.coverImage}
        imageAlt={blog.title}
      />
    </div>
  );
} 