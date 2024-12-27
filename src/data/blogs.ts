// Blog verisi için interface
export interface Blog {
  id: string;
  author: {
    name: string;
    image: string;
  };
  title: string;
  summary: string;
  coverImage: string;
  content: string;
  publishDate: string;
  likes: number;
  category: 'technology' | 'software' | 'design' | 'productivity';
}

// Mock blog verileri
export let MOCK_BLOGS: Blog[] = Array.from({ length: 50 }, (_, i) => {
  // Her kategori için eşit sayıda blog oluştur
  const categories: Blog['category'][] = ['technology', 'software', 'design', 'productivity'];
  const category = categories[i % categories.length];

  return {
    id: `blog-${i + 1}`,
    author: {
      name: `Yazar ${i + 1}`,
      image: '/default-avatar.png',
    },
    title: `${getCategoryTitle(category)} Blog ${i + 1}`,
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
    
    Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.`,
    coverImage: '/image.webp',
    publishDate: new Date(Date.now() - i * 86400000).toISOString(),
    likes: Math.floor(Math.random() * 100),
    category,
  };
}).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

// Kategori başlıklarını al
function getCategoryTitle(category: Blog['category']): string {
  const titles = {
    technology: 'Teknoloji',
    software: 'Yazılım',
    design: 'Tasarım',
    productivity: 'Verimlilik'
  };
  return titles[category];
}

// Yeni blog ekleme fonksiyonu
export const addBlog = (blog: Omit<Blog, 'id' | 'author' | 'likes' | 'publishDate'>) => {
  const newBlog: Blog = {
    id: `blog-${MOCK_BLOGS.length + 1}`,
    author: {
      name: 'Yeni Yazar',
      image: '/default-avatar.png',
    },
    ...blog,
    publishDate: new Date().toISOString(),
    likes: 0,
  };

  MOCK_BLOGS = [newBlog, ...MOCK_BLOGS];
  return newBlog;
};

// Kategoriye göre blogları getir
export const getBlogsByCategory = (category: Blog['category']) => {
  return MOCK_BLOGS.filter(blog => blog.category === category);
};

// Blog detayını getir
export const getBlogById = (id: string) => {
  return MOCK_BLOGS.find(blog => blog.id === id);
}; 