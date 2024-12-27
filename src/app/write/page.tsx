'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiPlus } from 'react-icons/fi';
import { addBlog } from '../../data/blogs';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleContentClick = () => {
    setIsWriting(true);
    contentRef.current?.focus();
  };

  const handlePublish = () => {
    if (title && content) {
      const blog = addBlog({
        title,
        content,
        summary: content.slice(0, 200) + '...',
        coverImage: '/image.webp',
        category: 'technology'
      });
      
      router.push(`/blog/${blog.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto pt-20 px-4">
        <div className="fixed top-20 right-4 md:right-[calc((100%-768px)/2)]">
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-[#333333] text-white rounded-full hover:bg-[#222222]"
          >
            Publish
          </button>
        </div>

        <div className="space-y-8">
          {/* Resim Yükleme */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {selectedImage ? (
              <div className="relative w-full h-[300px]">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={handleImageClick}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <FiPlus className="text-xl" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleImageClick}
                className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 flex items-center justify-center gap-2"
              >
                <FiPlus className="text-xl" />
                <span>Add cover image</span>
              </button>
            )}
          </div>

          {/* Başlık */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold placeholder-gray-300 focus:outline-none"
          />

          {/* İçerik */}
          <div onClick={handleContentClick}>
            <textarea
              ref={contentRef}
              placeholder={isWriting ? '' : 'Tell your story...'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[300px] placeholder-gray-500 focus:outline-none resize-none"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 