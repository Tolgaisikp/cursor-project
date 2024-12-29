'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogDetailClient from './BlogDetailClient';
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
        <BlogDetailClient blog={blog} />
      </main>
      <Footer />
    </div>
  );
}