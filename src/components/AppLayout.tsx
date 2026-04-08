import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { LayoutDashboard, Compass, Map, BookOpen, LogOut, Menu, X, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/matches', label: 'Matches', icon: Compass },
  { to: '/itineraries', label: 'Itineraries', icon: Map },
  { to: '/diaries', label: 'Diaries', icon: BookOpen },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-2">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <Compass className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display text-lg font-semibold text-foreground">Signature Trips</span>
        </Link>
      </div>

      {/* User Profile */}
      <Link
        to="/settings"
        className="mx-4 mt-4 mb-2 flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-colors group"
      >
        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="min-w-0">
          <p className="font-body text-sm font-medium text-foreground truncate">{user?.name || 'Traveler'}</p>
          <p className="font-body text-xs text-muted-foreground truncate">{user?.email || ''}</p>
        </div>
      </Link>

      {/* Redo Quiz Button */}
      <div className="px-4 mt-2 mb-4">
        <button
          onClick={() => navigate('/quiz')}
          className="relative overflow-hidden w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[hsl(150,80%,38%)] text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[hsl(150,80%,38%)]/30 group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
          <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180 relative z-10" />
          <span className="relative z-10">Redo Quiz</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border/50" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-200 group ${
              isActive(link.to)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <link.icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
              isActive(link.to) ? 'text-primary' : ''
            }`} />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6">
        <div className="mx-1 mb-3 border-t border-border/50" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border/50 bg-card/50 backdrop-blur-sm fixed inset-y-0 left-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border/50 flex items-center px-4">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-accent/50 transition-colors">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2 ml-3">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-display text-base font-semibold">Signature Trips</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-60 bg-card border-r border-border/50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 min-h-screen">
        <div className="pt-14 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
