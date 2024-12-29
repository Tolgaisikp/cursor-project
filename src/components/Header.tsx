'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiEdit, FiBell, FiHeart, FiMessageSquare, FiCheck, FiUser, FiBookmark, FiFileText, FiBarChart2, FiTrash2 } from 'react-icons/fi';
import { MOCK_NOTIFICATIONS, markAsRead, markAllAsRead, getUnreadCount, clearNotifications } from '../data/notifications';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    setUnreadCount(getUnreadCount());
  }, [notifications]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = () => {
    setShowNotifications(false);
  };

  const handleNotificationRead = (id: number) => {
    markAsRead(id);
    setNotifications([...MOCK_NOTIFICATIONS]);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications([...MOCK_NOTIFICATIONS]);
  };

  const handleClearNotifications = () => {
    clearNotifications();
    setNotifications([...MOCK_NOTIFICATIONS]);
    setShowNotifications(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileMenuClose = () => {
    setShowProfileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 py-5">
            <Image
              src="/logo.png"
              alt="Blog Logo"
              width={80}
              height={30}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleSearch}
            />
            <FiSearch className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/write">
            <button className="flex items-center space-x-1 px-4 py-2 bg-[#333333] text-white rounded-full hover:bg-[#222222]">
              <FiEdit className="text-lg" />
              <span>Write</span>
            </button>
          </Link>
          
          <div className="relative">
            <button 
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={handleNotificationClick}
            >
              <FiBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Bildirim Dropdown */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0" 
                  onClick={handleClickOutside}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold">Bildirimler</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        <FiCheck className="text-lg" />
                        <span>Tümünü okundu işaretle</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-center text-gray-500">
                        Bildirim bulunmuyor
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 flex items-start gap-3 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationRead(notification.id)}
                        >
                          <div className={`p-2 rounded-full ${
                            notification.type === 'like' ? 'bg-red-100' : 'bg-blue-100'
                          }`}>
                            {notification.type === 'like' ? (
                              <FiHeart className="text-red-500" />
                            ) : (
                              <FiMessageSquare className="text-blue-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{notification.user}</span>
                              {' '}{notification.content}
                            </p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button
                        onClick={handleClearNotifications}
                        className="w-full py-2 text-sm text-red-500 hover:text-red-600 flex items-center justify-center gap-2"
                      >
                        <FiTrash2 className="text-lg" />
                        <span>Bildirimleri Temizle</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center"
              onClick={handleProfileClick}
            >
              <Image
                src="/default-avatar.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0" 
                  onClick={handleProfileMenuClose}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link href="/profile">
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                      <FiUser className="text-gray-500" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link href="/library">
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                      <FiBookmark className="text-gray-500" />
                      <span>Library</span>
                    </div>
                  </Link>
                  <Link href="/stories">
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                      <FiFileText className="text-gray-500" />
                      <span>Stories</span>
                    </div>
                  </Link>
                  <Link href="/stats">
                    <div className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3">
                      <FiBarChart2 className="text-gray-500" />
                      <span>Stats</span>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;