import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  LogOut, User as UserIcon, Shield, Mail, Calendar, LayoutDashboard,
  FileText, Settings, ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { getMe } from '@/features/auth/api/userApi';

function getRoleBadgeStyle(role: string) {
  if (role === 'admin')
    return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
  return 'bg-[#5DD7AD]/15 text-[#5DD7AD] border border-[#5DD7AD]/30';
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: FileText, label: 'Documents', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export default function DashboardPage() {
  const { accessToken, user: storedUser, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    initialData: storedUser ?? undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleLogout = () => {
    logout();
    navigate('/signin', { replace: true });
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex relative overflow-hidden">
      {/* Animated background gradient to match landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#122663] via-[#0a1628] to-[#0d2040] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5DD7AD]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#122663]/40 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-[#080f1e]/95 backdrop-blur-xl shrink-0">
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
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-[#5DD7AD]/10 text-[#5DD7AD] border border-[#5DD7AD]/20'
                  : 'text-white/50 hover:text-white/90 hover:bg-white/5'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="border-b border-white/5 px-8 py-4 flex items-center justify-between bg-black/10 backdrop-blur-sm sticky top-0">
          <div>
            <h1 className="text-lg font-semibold text-white">Overview</h1>
            <p className="text-xs text-white/40 mt-0.5">Your account at a glance</p>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DD7AD] to-[#3ab88e] flex items-center justify-center text-[10px] font-bold text-[#0a1628] shadow-md">
                {getInitials(user.name)}
              </div>
              <span className="text-sm text-white/70 font-medium">{user.name}</span>
            </div>
          )}
        </header>

        <div className="p-8 space-y-6">
          {user ? (
            <>
              {/* Profile card */}
              <div
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 relative overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 48px -12px rgba(0,0,0,0.4)' }}
              >
                {/* BG glow */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/8 blur-[80px] pointer-events-none" />

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5DD7AD] to-[#3ab88e] flex items-center justify-center text-2xl font-bold text-[#0a1628] shadow-xl shadow-[#5DD7AD]/20 shrink-0">
                    {getInitials(user.name)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-white">{user.name}</h2>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getRoleBadgeStyle(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </div>
                    {user.email && (
                      <p className="text-sm text-white/50 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Email card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex items-start gap-4 hover:border-[#5DD7AD]/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-[#5DD7AD]/15 border border-[#5DD7AD]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#5DD7AD]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Email</p>
                    <p className="text-sm text-white/80 mt-1 break-all">{user.email ?? '—'}</p>
                  </div>
                </div>

                {/* Role card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex items-start gap-4 hover:border-blue-500/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Role</p>
                    <p className="text-sm text-white/80 mt-1 capitalize">{user.role}</p>
                  </div>
                </div>

                {/* Member since card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex items-start gap-4 hover:border-blue-500/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Member since</p>
                    <p className="text-sm text-white/80 mt-1">{formatDate(user.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Account ID */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <UserIcon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Account ID</p>
                  <p className="text-sm text-white/80 mt-1 font-mono">#{user.id}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-white/40">Could not load user data.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
