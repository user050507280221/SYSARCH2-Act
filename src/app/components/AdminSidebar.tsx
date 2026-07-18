import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  FileText,
  Wrench,
  BarChart3,
  GraduationCap,
  ChevronDown,
  UserCircle,
  LogIn,
  UserCog,
  Shield,
  Home,
  UserCheck,
  Eye,
  Calendar,
  FileSignature,
  Clock,
  Bell,
  Megaphone,
  AlertCircle,
  Printer,
  ClipboardList,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface SubItem {
  label: string;
  id: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  subItems?: SubItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Admin Functions',
    items: [
      {
        icon: Users,
        label: 'User Management',
        id: 'user-mgmt',
        subItems: [
          { label: 'Register Account', id: 'register-account' },
          { label: 'Log In Credentials', id: 'login-credentials' },
          { label: 'Manage Tenants', id: 'manage-tenants' },
          { label: 'Identify Role', id: 'identify-role' },
        ],
      },
      {
        icon: Building2,
        label: 'Property Management',
        id: 'property-mgmt',
        subItems: [
          { label: 'Add/Update Dorm Info', id: 'dorm-info' },
          { label: 'Assign Tenants', id: 'assign-tenants' },
          { label: 'Monitor Availability', id: 'monitor-availability' },
        ],
      },
      {
        icon: UserCheck,
        label: 'Tenant Management',
        id: 'tenant-mgmt',
        subItems: [
          { label: 'Tenant Registration/Approval', id: 'tenant-approval' },
          { label: 'Track Status', id: 'track-status' },
          { label: 'Monitor Check-in/Check-out', id: 'monitor-checkin' },
        ],
      },
      {
        icon: FileSignature,
        label: 'Payment & Contract Management',
        id: 'payment-contract-mgmt',
        subItems: [
          { label: 'Track Payments', id: 'track-payments' },
          { label: 'Manage Contracts', id: 'manage-contracts' },
          { label: 'Monitor Expirations', id: 'monitor-expirations' },
        ],
      },
      {
        icon: Wrench,
        label: 'Maintenance Management',
        id: 'maintenance-mgmt',
        subItems: [
          { label: 'View Requests', id: 'view-requests' },
          { label: 'Assign Tasks', id: 'assign-tasks' },
          { label: 'Track Status', id: 'track-maintenance-status' },
        ],
      },
      {
        icon: Bell,
        label: 'Notification Management',
        id: 'notification-mgmt',
        subItems: [
          { label: 'Send Announcements', id: 'send-announcements' },
          { label: 'Send Payment Reminders', id: 'send-payment-reminders' },
          { label: 'Send Expiry Alerts', id: 'send-expiry-alerts' },
        ],
      },
      {
        icon: Printer,
        label: 'Reports & Analytics',
        id: 'reports-analytics',
        subItems: [
          { label: 'Print Occupancy', id: 'print-occupancy' },
          { label: 'Print Payments', id: 'print-payments' },
          { label: 'Print Tenants', id: 'print-tenants' },
          { label: 'Print Maintenance', id: 'print-maintenance' },
        ],
      },
    ],
  },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['user-mgmt']);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const activeView = location.pathname === '/' ? 'dashboard' : location.pathname.split('/').pop() || 'dashboard';

  return (
    <div className="w-72 bg-primary h-screen flex flex-col shadow-xl overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-primary sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/10 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-base leading-tight font-medium">Dorm Tenant</h1>
            <h1 className="text-white text-base leading-tight font-medium">Management System</h1>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="lg:hidden px-4 pt-4 pb-2 space-y-2">
        <button
          onClick={() => handleNavigate('/')}
          className="w-full px-4 py-2.5 rounded-xl transition-all shadow-sm bg-white text-primary border border-white hover:bg-white/90"
        >
          Admin Dashboard
        </button>
        <button
          onClick={() => handleNavigate('/tenant')}
          className="w-full px-4 py-2.5 rounded-xl transition-all shadow-sm bg-white/10 text-white border border-white/20 hover:bg-white/20"
        >
          Tenant App
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={groupIndex > 0 ? 'mt-6' : ''}>
            <div className="px-3 mb-2">
              <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
                {group.title}
              </span>
            </div>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedItems.includes(item.id);
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.id} className="mb-1">
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        toggleExpanded(item.id);
                      } else {
                        handleNavigate(`/${item.id}`);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      activeView === item.id
                        ? 'bg-secondary text-white shadow-md'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Sub-items */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavigate(`/${subItem.id}`)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                            activeView === subItem.id
                              ? 'bg-white/20 text-white'
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                          <span className="text-left">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-primary/95 sticky bottom-0">
        <div className="bg-white/5 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium text-sm">
              A
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Angel</p>
              <p className="text-white/60 text-xs">admin@university.edu</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('currentUser');
              handleNavigate('/login');
            }}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 rotate-180" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}