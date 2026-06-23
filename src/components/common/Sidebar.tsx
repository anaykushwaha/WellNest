import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

const iconMap = {
  LayoutDashboard,
  ClipboardCheck,
  Wind,
  History,
  HeartHandshake,
};

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-24 space-y-1">
        {NAV_ITEMS.map(({ path, label, icon }) => {
          const Icon = iconMap[icon as keyof typeof iconMap];
          return (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-wellness-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-wellness-50 hover:text-wellness-700'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
