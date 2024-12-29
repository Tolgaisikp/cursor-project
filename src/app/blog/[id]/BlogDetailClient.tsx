'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '../../../components/Header';
import ImageModal from '../../../components/ImageModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Highlight, themes } from 'prism-react-renderer';

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

  // Calculate read time (assuming average reading speed of 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  // Format date as "Aug 29, 2024"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto pt-8 px-4">
        {/* Blog Başlığı */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Yazar ve Tarih Bilgisi */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={blog.author.image}
            alt={blog.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{blog.author.name}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">
            {calculateReadTime(blog.content)} · {formatDate(blog.publishDate)}
            </span>
          </div>
        </div>

        {/* Kapak Resmi */}
        {blog.coverImage && (
          <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsImageModalOpen(true)}
            />
          </div>
        )}

        {/* Blog İçeriği */}
        <article className="prose lg:prose-xl max-w-none">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                h2: ({ ...props }) => <h2 className="text-2xl font-bold mb-3" {...props} />,
                h3: ({ ...props }) => <h3 className="text-xl font-bold mb-2" {...props} />,
                p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                li: ({ ...props }) => <li className="mb-1" {...props} />,
                strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                code: ({ inline, children, ...props }) => {
                  const match = /language-(\w+)/.exec(props.className || '');
                  const language = match ? match[1] : '';
                  
                  if (inline) {
                    return <code className="px-1 py-0.5 bg-gray-100 rounded text-pink-600" {...props}>{children}</code>;
                  }

                  return (
                    <div className="relative">
                      <Highlight
                        theme={themes.vsLight}
                        code={String(children).replace(/\n$/, '')}
                        language={language || 'typescript'}
                      >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                          <pre className="rounded-lg p-4 overflow-x-auto bg-[#F8F9FC]" style={style}>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                    </div>
                  );
                }
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Yazar Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-8">
            <Image
              src={blog.author.image}
              alt={blog.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-medium text-lg">{blog.author.name}</h3>
                <button className="px-4 py-1.5 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
                  Follow
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>2.5K Followers</span>
                <span>·</span>
                <span>Software Engineer & Technical Writer</span>
              </div>
              <p className="text-gray-600 mt-2">{blog.author.bio}</p>
            </div>
          </div>
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