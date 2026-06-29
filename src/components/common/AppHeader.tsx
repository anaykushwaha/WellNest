import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

interface AppHeaderProps {
  onMenuToggle: () => void;
}

export function AppHeader({ onMenuToggle }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-wellness-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          <span className="text-xl font-bold text-wellness-700">{APP_NAME}</span>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
