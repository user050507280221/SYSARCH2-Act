import { useNavigate, Outlet } from 'react-router';
import { AdminSidebar } from '../components/AdminSidebar';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function AdminPortal() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
        <h1 className="text-lg font-medium text-gray-900">Admin Portal</h1>
        <div className="w-10"></div>
      </div>

      {/* Desktop Header Buttons */}
      <div className="hidden lg:flex fixed top-4 right-4 z-50 gap-2">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl transition-all shadow-sm bg-primary text-white hover:bg-primary/90"
        >
          Admin Dashboard
        </button>
        <button
          onClick={() => navigate('/tenant')}
          className="px-4 py-2 rounded-xl transition-all shadow-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        >
          Tenant App
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: Always visible, Mobile: Slides in as overlay */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <AdminSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
}