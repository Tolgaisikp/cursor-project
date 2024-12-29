'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FiX, FiCamera } from 'react-icons/fi';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  currentName: string;
  currentBio: string;
  currentEmail: string;
  onSave: (data: {
    image: string;
    name: string;
    bio: string;
    email: string;
  }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  currentImage,
  currentName,
  currentBio,
  currentEmail,
  onSave,
}: EditProfileModalProps) {
  const [image, setImage] = useState(currentImage);
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [email, setEmail] = useState(currentEmail);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      image: image,
      name: name,
      bio: bio,
      email: email,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profili Düzenle</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="text-gray-500" />
          </button>
        </div>

        {/* Profil Fotoğrafı */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Image
              src={previewImage}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white"
            >
              <FiCamera className="text-lg" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500">
            PNG veya JPG formatında bir fotoğraf yükleyin
          </p>
        </div>

        {/* Form Alanları */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              İsim
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biyografi
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
