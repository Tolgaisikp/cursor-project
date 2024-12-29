'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiPlus } from 'react-icons/fi';
import { addBlog } from '../../data/blogs';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const draftStories = [
  // Mock draft data
  { id: 'draft-1', title: 'Draft 1', summary: 'This is a draft', category: 'technology' },
  { id: 'draft-2', title: 'Draft 2', summary: 'This is another draft', category: 'software' },
];

export default function WritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<"technology" | "software" | "design" | "productivity">('technology');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load draft data when editing
  useEffect(() => {
    const draftId = searchParams.get('draft');
    if (draftId) {
      // Find the draft from draftStories
      const draft = draftStories.find(draft => draft.id === draftId);
      if (draft) {
        setTitle(draft.title);
        setContent(draft.summary); // Since we don't have full content in mock data
        if (draft.category === 'technology' || 
            draft.category === 'software' || 
            draft.category === 'design' || 
            draft.category === 'productivity') {
          setCategory(draft.category);
        } else {
          setCategory('technology'); // fallback to default
        }
      }
    }
  }, [searchParams]);

  const categories = [
    'technology',
    'software',
    'design',
    'productivity'
  ];

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    if (title && content && category) {
      const blog = addBlog({
        title,
        content,
        summary: content.replace(/[#*`]/g, '').slice(0, 200) + '...',
        coverImage: '/image.webp',
        category
      });
      
      router.push(`/blog/${blog.id}`);
    }
  };

  const handleContentChange = (value?: string) => {
    if (value !== undefined) {
      setContent(value);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header />
      
      <main className="max-w-4xl mx-auto pt-20 px-4">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold placeholder-gray-300 focus:outline-none"
            />
          </div>
          <button
            onClick={handlePublish}
            className="px-6 py-3 bg-[#333333] text-white rounded-full hover:bg-[#222222] shadow-md flex-shrink-0"
          >
            Publish
          </button>
        </div>

        <div className="space-y-8">
          {/* Kategori Seçimi */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "technology" | "software" | "design" | "productivity")}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Resim Yükleme */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              {selectedImage ? (
                <div className="flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-h-48 rounded"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FiPlus className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-gray-500">Add cover image</span>
                </div>
              )}
            </div>
          </div>

          {/* Markdown Editor */}
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={handleContentChange}
              preview="edit"
              height={400}
              className="w-full mb-6"
              textareaProps={{
                placeholder: '# Başlık\n\n## Alt Başlık\n\nİçeriğinizi markdown formatında yazın...'
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}