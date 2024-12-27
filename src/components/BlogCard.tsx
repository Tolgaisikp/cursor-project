import Image from 'next/image';
import { FiHeart, FiBookmark } from 'react-icons/fi';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  author: {
    name: string;
    image: string;
  };
  title: string;
  summary: string;
  publishDate: string;
  likes: number;
  coverImage: string;
}

const BlogCard = ({ id, author, title, summary, publishDate, likes, coverImage }: BlogCardProps) => {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    // Like işlemleri burada yapılacak
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    // Kaydetme işlemleri burada yapılacak
  };

  return (
    <Link href={`/blog/${id}`} className="block">
      <article className="flex flex-col gap-4 p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <Image
            src={author.image}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">{author.name}</span>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 line-clamp-3">{summary}</p>
          </div>

          <div className="flex-shrink-0">
            <Image
              src={coverImage}
              alt={title}
              width={200}
              height={134}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>{new Date(publishDate).toLocaleDateString()}</span>
          
          <div className="flex items-center gap-4">
            <button 
              type="button"
              className="flex items-center gap-1 hover:text-red-500" 
              onClick={handleLike}
            >
              <FiHeart />
              <span>{likes}</span>
            </button>
            
            <button 
              type="button"
              className="hover:text-blue-500" 
              onClick={handleSave}
            >
              <FiBookmark />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard; 