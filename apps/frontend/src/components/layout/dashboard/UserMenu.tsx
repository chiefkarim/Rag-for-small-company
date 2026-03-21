import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores/authStore';
import type { User } from '@/features/auth/types';

export function UserMenu({ user }: { user: User | null | undefined }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-6">
       <button
        id="logout-btn"
        onClick={handleLogout}
        className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-red-500/60 hover:text-red-500 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
      
      <div className="flex items-center gap-4 pl-6 border-l border-border/50">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-serif italic text-primary-foreground shadow-sm">
          {getInitials(user.name)}
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-sm text-foreground font-serif italic font-medium leading-none">{user.name}</span>
          <span className="text-[9px] uppercase tracking-tighter text-muted-foreground mt-1">Administrator</span>
        </div>
      </div>
    </div>
  );
}
