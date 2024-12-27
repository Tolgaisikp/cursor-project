import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Blog Logo"
                width={100}
                height={40}
                className="h-auto mb-4"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Teknoloji, yazılım ve güncel konular hakkında özgün içerikler sunan blog platformu.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Kullanım Şartları
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/technology" className="text-gray-600 hover:text-gray-900 text-sm">
                  Teknoloji
                </Link>
              </li>
              <li>
                <Link href="/category/software" className="text-gray-600 hover:text-gray-900 text-sm">
                  Yazılım
                </Link>
              </li>
              <li>
                <Link href="/category/design" className="text-gray-600 hover:text-gray-900 text-sm">
                  Tasarım
                </Link>
              </li>
              <li>
                <Link href="/category/productivity" className="text-gray-600 hover:text-gray-900 text-sm">
                  Verimlilik
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Blog. Tüm hakları saklıdır.
          </p>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 