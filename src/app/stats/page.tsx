'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiTrendingUp, FiUsers, FiEye, FiHeart } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';

export default function StatsPage() {
  // En popüler 3 blogu göster
  const topStories = MOCK_BLOGS.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          <h1 className="text-4xl font-bold mb-8">İstatistikler</h1>

          {/* Genel İstatistikler */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Toplam Görüntülenme', value: '45.3K', icon: FiEye, color: 'bg-blue-500' },
              { label: 'Toplam Beğeni', value: '2.1K', icon: FiHeart, color: 'bg-red-500' },
              { label: 'Toplam Takipçi', value: '1.2K', icon: FiUsers, color: 'bg-green-500' },
              { label: 'Büyüme', value: '+24%', icon: FiTrendingUp, color: 'bg-purple-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                  <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Görüntülenme Grafiği */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Görüntülenme Analizi</h2>
            <div className="h-64 flex items-end justify-between gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex-1">
                  <div 
                    className="bg-blue-500 bg-opacity-20 hover:bg-opacity-30 rounded-t transition-all"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                  <div className="text-xs text-gray-500 text-center mt-2">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString('tr-TR', { weekday: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* En İyi Performans Gösteren Hikayeler */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">En İyi Performans Gösteren Hikayeler</h2>
            <div className="space-y-6">
              {topStories.map((blog, index) => (
                <div key={blog.id} className="relative">
                  <div className="absolute -left-3 top-3 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 