// Blog verisi için interface
export interface Blog {
  id: string;
  author: {
    name: string;
    image: string;
    bio: string;
  };
  title: string;
  summary: string;
  coverImage: string;
  content: string;
  publishDate: string;
  likes: number;
  category: 'technology' | 'software' | 'design' | 'productivity';
  isDraft?: boolean;
  lastEdited?: string;
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
      bio: 'Bu yazarın biyografisi',
    },
    title: `${getCategoryTitle(category)} Blog ${i + 1}`,
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    content: `# ${getCategoryTitle(category)}: Blog ${i + 1}

## Giriş

Bu yazıda, ${category} alanındaki son gelişmeleri ve önemli konuları ele alacağız.

### Önemli Noktalar

- Birinci önemli nokta
- İkinci önemli nokta
- Üçüncü önemli nokta

## Detaylı Analiz

Lorem ipsum dolor sit amet, **consectetur** adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

### Alt Başlık

1. Birinci madde
2. İkinci madde
3. Üçüncü madde

## Sonuç

*İtalik* ve **kalın** yazı tipleri ile markdown'ın düzgün çalıştığını test edebiliriz.

> Bu bir alıntıdır. Markdown formatında görüntülenmelidir.

\`\`\`javascript
// Bu bir kod bloğudur
const test = "Markdown çalışıyor";
console.log(test);
\`\`\`
`,
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
      bio: 'Bu yazarın biyografisi',
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