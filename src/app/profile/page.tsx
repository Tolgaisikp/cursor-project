'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiTwitter, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import EditProfileModal from '../../components/EditProfileModal';

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('stories');
  const [profileData, setProfileData] = useState({
    image: '/default-avatar.png',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software Developer & Technical Writer',
  });

  const handleProfileUpdate = (data: {
    image: string;
    name: string;
    bio: string;
    email: string;
  }) => {
    setProfileData(data);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stories':
        return (
          <div className="space-y-6">
            {stories.length > 0 ? (
              stories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/blog/1`}>
                        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                          {story.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-3">{story.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{story.date}</span>
                        <span>·</span>
                        <span>{story.readTime} min read</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <FiHeart className="text-red-500" />
                          {story.likes}
                        </span>
                      </div>
                    </div>
                    {story.coverImage && (
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        width={120}
                        height={80}
                        className="rounded-lg ml-4 object-cover"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                Henüz bir hikaye paylaşılmadı.
              </div>
            )}
          </div>
        );
      case 'about':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-4">Hakkımda</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Biyografi</h4>
                <p className="text-gray-600">{profileData.bio}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">İletişim</h4>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sosyal Medya</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiGithub className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      case 'featured':
        return (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredStories.length > 0 ? (
                featuredStories.map((story) => (
                  <div key={story.id} className="border border-gray-100 rounded-lg p-4">
                    <Link href={`/blog/1`}>
                      <div className="relative h-48 mb-4">
                        <Image
                          src={story.coverImage}
                          alt={story.title}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
                        {story.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm">{story.summary}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-500 py-8">
                  Henüz öne çıkan hikaye bulunmuyor.
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Mock data for stories
  const stories = [
    {
      id: 'story-1',
      title: 'React ile Modern Web Uygulamaları Geliştirme',
      summary: 'Modern web uygulamalarının nasıl geliştirileceğini ve React\'in sunduğu avantajları keşfedin.',
      date: '29 Aralık 2023',
      readTime: 5,
      likes: 42,
      coverImage: '/image.webp'
    },
    {
      id: 'story-2',
      title: 'TypeScript: JavaScript\'in Güçlü Kardeşi',
      summary: 'TypeScript\'in temel özelliklerini ve neden tercih edilmesi gerektiğini öğrenin.',
      date: '28 Aralık 2023',
      readTime: 7,
      likes: 38,
      coverImage: '/image.webp'
    }
  ];

  // Mock data for featured stories
  const featuredStories = [
    {
      id: 'featured-1',
      title: 'Next.js 13 ile Server Side Rendering',
      summary: 'Next.js 13\'ün yeni özelliklerini ve SSR avantajlarını keşfedin.',
      coverImage: '/image.webp'
    },
    {
      id: 'featured-2',
      title: 'Tailwind CSS ile Hızlı UI Geliştirme',
      summary: 'Tailwind CSS kullanarak nasıl hızlı ve etkili UI geliştirilebileceğini öğrenin.',
      coverImage: '/image.webp'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto pt-24 px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center gap-6">
              <div>
                <Image
                  src={profileData.image}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{profileData.bio}</p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiGithub className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FiLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Stories', value: stories.length },
              { label: 'Followers', value: '1.2K' },
              { label: 'Following', value: '348' },
              { label: 'Total Views', value: '45.3K' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8">
              {[
                { label: 'Stories', value: 'stories' },
                { label: 'About', value: 'about' },
                { label: 'Featured', value: 'featured' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`pb-4 px-2 ${
                    activeTab === tab.value
                      ? 'border-b-2 border-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>

      <Footer />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentImage={profileData.image}
        currentName={profileData.name}
        currentBio={profileData.bio}
        currentEmail={profileData.email}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}