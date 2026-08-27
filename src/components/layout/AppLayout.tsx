import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  LineChart, 
  MessageSquare, 
  Map, 
  Compass, 
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessments', href: '/assessments', icon: ClipboardList },
  { name: 'Insights', href: '/insights', icon: LineChart },
  { name: 'AI Companion', href: '/ai-companion', icon: MessageSquare },
  { name: 'Wellness Plan', href: '/wellness-plan', icon: Map },
  { name: 'Programs', href: '/programs', icon: Compass },
  { name: 'Resources', href: '/resources', icon: BookOpen },
];

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--color-surface-primary)] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--color-surface-secondary)] border-r border-[var(--color-border)] transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--color-border)]">
          <span className="text-xl font-semibold tracking-wide text-[var(--color-accent)]">SEIMEI</span>
          <button 
            className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]" 
                  : "text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text-primary)]"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between h-16 px-4 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)]">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <Menu size={24} />
          </button>
          <span className="text-lg font-semibold tracking-wide text-[var(--color-accent)]">SEIMEI</span>
          <div className="w-6" /> {/* spacer for alignment */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
