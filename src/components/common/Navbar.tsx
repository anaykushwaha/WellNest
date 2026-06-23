import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { NAV_ITEMS, APP_NAME } from '@/lib/constants';

const iconMap = {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wellness-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-8 w-8" />
          <span className="text-xl font-bold text-wellness-700">{APP_NAME}</span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ path, label, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-wellness-100 text-wellness-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-wellness-600'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-wellness-100 bg-white px-4 py-3 md:hidden">
          {NAV_ITEMS.map(({ path, label, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            return (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-wellness-100 text-wellness-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>
      )}
    </header>
  );
}
