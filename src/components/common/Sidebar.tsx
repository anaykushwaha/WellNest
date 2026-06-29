import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
  X,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

const iconMap = {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navContent = (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ path, label, icon }) => {
        const Icon = iconMap[icon as keyof typeof iconMap];
        const to = path === '/check-in' ? '/check-in/new' : path;
        return (
          <NavLink
            key={path}
            to={to}
            end={path === '/'}
            onClick={onClose}
            className={() => {
              const active =
                path === '/check-in'
                  ? location.pathname.startsWith('/check-in')
                  : path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(path);
              return `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                active
                  ? 'bg-wellness-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-wellness-50 hover:text-wellness-700'
              }`;
            }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24">{navContent}</div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
            aria-label="Close navigation menu"
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-bold text-wellness-700">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
