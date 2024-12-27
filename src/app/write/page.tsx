'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Image from 'next/image';
import { addBlog } from '../../data/blogs';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('Lütfen başlık ve içerik alanlarını doldurun.');
      return;
    }

    // Yeni blog ekle
    const newBlog = addBlog({
      title: title.trim(),
      content: content.trim(),
      summary: content.trim().slice(0, 200) + '...', // İlk 200 karakter
      coverImage: selectedImage || '/image.webp',
    });

    // Ana sayfaya yönlendir
    router.push('/');
    router.refresh(); // Sayfayı yenile
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Textarea'yı otomatik genişlet
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            {/* Artı İkonu */}
            <button 
              onClick={handleImageClick}
              className="text-4xl text-gray-300 font-light hover:text-gray-400 cursor-pointer"
            >
              +
            </button>
            
            {/* Gizli Dosya Input'u */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {/* Blog Yazma Formu */}
            <div className="flex-1">
              {/* Başlık ve Yayınla Butonu */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 text-3xl font-bold focus:outline-none placeholder-gray-300"
                />
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-[#333333] text-white text-sm rounded-full hover:bg-[#222222] transition-colors whitespace-nowrap"
                >
                  Yayınla
                </button>
              </div>

              {/* Seçilen Resim */}
              {selectedImage && (
                <div className="relative w-full h-[300px] my-4">
                  <Image
                    src={selectedImage}
                    alt="Selected cover"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}

              {/* İçerik */}
              <textarea
                ref={textareaRef}
                placeholder="Tell your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-lg font-light focus:outline-none placeholder-gray-300 resize-none overflow-hidden min-h-[24px]"
                style={{ height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 