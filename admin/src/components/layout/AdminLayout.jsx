import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquareQuote,
  Settings,
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../utils/constants';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Properties', path: '/properties', icon: Building2 },
    { name: 'Inquiries & Leads', path: '/leads', icon: Users },
    { name: 'Client Feedbacks', path: '/testimonials', icon: MessageSquareQuote },
    { name: 'Settings & Security', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col md:flex-row antialiased text-slate-800">
      
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-white/95 text-[#181B22] px-4 py-3 flex items-center justify-between border-b border-[#E7E2D8] sticky top-0 z-30 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#A88548]/40 p-1 flex items-center justify-center shadow-2xs">
            <img src="/logo.png" alt="Property Gateway" className="w-full h-full object-contain rounded" />
          </div>
          <div>
            <h1 className="text-sm font-serif font-bold tracking-tight text-[#181B22]">Property Gateway</h1>
            <p className="text-[10px] text-[#7D5D2A] font-bold">Admin Management Portal</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:text-[#181B22] hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#181B22]" /> : <Menu className="w-6 h-6 text-[#181B22]" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white text-slate-700 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 border-r border-[#E7E2D8] shadow-xs
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-[#E7E2D8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#A88548]/40 p-1.5 flex items-center justify-center shadow-2xs shrink-0">
                <img src="/logo.png" alt="Property Gateway" className="w-full h-full object-contain rounded" />
              </div>
              <div>
                <h2 className="text-sm font-serif font-bold text-[#181B22] tracking-tight">Property Gateway</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] text-[#7D5D2A] font-bold">Admin Console</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive 
                      ? 'bg-gold-metallic text-white shadow-xs font-bold' 
                      : 'text-slate-600 hover:bg-[#FAF9F6] hover:text-[#7D5D2A]'}
                  `}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-[#E7E2D8] space-y-3 bg-[#FAF9F6]/60">
          {/* Live site link */}
          <a
            href={BRAND.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-[#FAF9F6] text-slate-700 hover:text-[#7D5D2A] text-xs font-semibold transition-colors border border-[#E7E2D8] shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-[#A88548]" />
              <span>Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* User & Logout */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <NavLink 
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="truncate pr-2 hover:opacity-80 transition-opacity"
              title="Manage Credentials & Security"
            >
              <p className="font-bold text-[#181B22] truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen overflow-y-auto">
        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden"
            aria-hidden="true"
          />
        )}

        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
