'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiTrendingUp, FiUsers, FiEye, FiHeart } from 'react-icons/fi';
import BlogCard from '../../components/BlogCard';
import { MOCK_BLOGS } from '../../data/blogs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StatsPage() {
  // En popüler 3 blogu göster
  const topStories = MOCK_BLOGS.slice(0, 3);

  // Görüntülenme verileri (son 7 gün)
  const viewsData = [
    { day: 'Pzt', views: 2100 },
    { day: 'Sal', views: 1800 },
    { day: 'Çar', views: 2800 },
    { day: 'Per', views: 3200 },
    { day: 'Cum', views: 2600 },
    { day: 'Cmt', views: 1500 },
    { day: 'Paz', views: 1200 },
  ];

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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Görüntülenme Analizi</h2>
              <div className="text-sm text-gray-500">Son 7 gün</div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280' }}
                    width={40}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                    content={({ active, payload }) => {
                      if (active && payload?.[0]?.value) {
                        return (
                          <div className="bg-gray-800 text-white text-xs rounded py-1 px-2">
                            {`${payload[0].value.toLocaleString()} görüntülenme`}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="views" 
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
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