import { useLocation } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import type { User } from '@/features/auth/types';

const pageTitles: Record<string, { title: string; description: string }> = {
  '/dashboard': { 
    title: 'Overview', 
    description: 'Your account at a glance' 
  },
  '/dashboard/': { 
    title: 'Overview', 
    description: 'Your account at a glance' 
  },
  '/dashboard/documents': { 
    title: 'Documents', 
    description: 'Manage and embed your workspace documents' 
  },
  '/dashboard/settings': { 
    title: 'Settings', 
    description: 'Manage your account preferences' 
  },
};

export function Topbar({ user }: { user: User | null | undefined }) {
  const location = useLocation();
  
  const currentPath = location.pathname;
  const pageInfo = pageTitles[currentPath] || { title: 'Dashboard', description: '' };

  return (
    <header className="border-b border-white/5 px-8 py-4 flex items-center justify-between bg-[#080f1e]/80 backdrop-blur-sm sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-semibold text-white">{pageInfo.title}</h1>
        {pageInfo.description && (
          <p className="text-xs text-white/40 mt-0.5">{pageInfo.description}</p>
        )}
      </div>
      <UserMenu user={user} />
    </header>
  );
}
