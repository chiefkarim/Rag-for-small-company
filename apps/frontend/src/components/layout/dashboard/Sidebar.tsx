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
    <aside className="w-64 border-r border-border/50 flex flex-col bg-secondary/40 backdrop-blur-xl shrink-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 group">
           <span className="text-xl font-serif font-bold italic tracking-tight text-foreground">
            Latafarraqo
          </span>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300
                ${active
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-primary-foreground' : 'text-primary'}`} />
              <span className={active ? '' : 'font-light'}>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
