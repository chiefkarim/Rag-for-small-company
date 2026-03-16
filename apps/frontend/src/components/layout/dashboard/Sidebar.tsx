import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Settings, ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col bg-[#080f1e]/95 backdrop-blur-xl shrink-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/vector/default-monochrome-white.svg"
            alt="latafarraqo logo"
            className="h-6 group-hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = path === '/dashboard' 
            ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
            : location.pathname.startsWith(path);
            
          return (
            <Link
              key={label}
              to={path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-[#5DD7AD]/10 text-[#5DD7AD] border border-[#5DD7AD]/20'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
