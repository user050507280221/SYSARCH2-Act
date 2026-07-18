import { useParams } from 'react-router';
import { FileText, Settings, Users, Building2, CreditCard, Wrench } from 'lucide-react';
import { TenantApproval } from '../components/pages/TenantApproval';
import { MaintenanceManagement } from '../components/pages/MaintenanceManagement';
import { TrackPayments } from '../components/pages/TrackPayments';
import { ReportsAnalytics } from '../components/pages/ReportsAnalytics';
import { RegisterAccount } from '../components/pages/RegisterAccount';
import { ManageTenants } from '../components/pages/ManageTenants';
import { RoomInventory } from '../components/pages/RoomInventory';
import { NotificationManagement } from '../components/pages/NotificationManagement';
import { LoginCredentials } from '../components/pages/LoginCredentials';
import { TrackStatus } from '../components/pages/TrackStatus';
import { CheckInOut } from '../components/pages/CheckInOut';

const pageConfig: Record<string, { title: string; description: string; icon: any }> = {
  'register-account': {
    title: 'Register Account',
    description: 'Create new user accounts for the system',
    icon: Users,
  },
  'login-credentials': {
    title: 'Log In Credentials',
    description: 'Manage user login credentials and authentication',
    icon: Settings,
  },
  'manage-tenants': {
    title: 'Manage Tenants',
    description: 'View and manage all tenant information',
    icon: Users,
  },
  'identify-role': {
    title: 'Identify Role',
    description: 'Assign and manage user roles and permissions',
    icon: Settings,
  },
  'dorm-info': {
    title: 'Add/Update Dorm Info',
    description: 'Manage dormitory information and details',
    icon: Building2,
  },
  'assign-tenants': {
    title: 'Assign Tenants',
    description: 'Assign tenants to available rooms',
    icon: Users,
  },
  'monitor-availability': {
    title: 'Monitor Availability',
    description: 'Track room availability and occupancy',
    icon: Building2,
  },
  'tenant-approval': {
    title: 'Tenant Registration/Approval',
    description: 'Review and approve new tenant registrations',
    icon: Users,
  },
  'track-status': {
    title: 'Track Status',
    description: 'Monitor tenant status and activity',
    icon: FileText,
  },
  'monitor-checkin': {
    title: 'Monitor Check-in/Check-out',
    description: 'Track tenant check-in and check-out dates',
    icon: FileText,
  },
  'track-payments': {
    title: 'Track Payments',
    description: 'Monitor payment history and outstanding balances',
    icon: CreditCard,
  },
  'manage-contracts': {
    title: 'Manage Contracts',
    description: 'Create and manage tenant contracts',
    icon: FileText,
  },
  'monitor-expirations': {
    title: 'Monitor Expirations',
    description: 'Track contract expiration dates',
    icon: FileText,
  },
  'view-requests': {
    title: 'View Requests',
    description: 'View all maintenance requests',
    icon: Wrench,
  },
  'assign-tasks': {
    title: 'Assign Tasks',
    description: 'Assign maintenance tasks to staff',
    icon: Wrench,
  },
  'track-maintenance-status': {
    title: 'Track Status',
    description: 'Monitor maintenance request status',
    icon: Wrench,
  },
  'send-announcements': {
    title: 'Send Announcements',
    description: 'Send announcements to all tenants',
    icon: FileText,
  },
  'send-payment-reminders': {
    title: 'Send Payment Reminders',
    description: 'Send payment reminder notifications',
    icon: CreditCard,
  },
  'send-expiry-alerts': {
    title: 'Send Expiry Alerts',
    description: 'Send contract expiration alerts',
    icon: FileText,
  },
  'print-occupancy': {
    title: 'Print Occupancy',
    description: 'Generate occupancy reports',
    icon: FileText,
  },
  'print-payments': {
    title: 'Print Payments',
    description: 'Generate payment reports',
    icon: FileText,
  },
  'print-tenants': {
    title: 'Print Tenants',
    description: 'Generate tenant reports',
    icon: FileText,
  },
  'print-maintenance': {
    title: 'Print Maintenance',
    description: 'Generate maintenance reports',
    icon: FileText,
  },
  'tenant-register': {
    title: 'Register Account',
    description: 'Create your tenant account',
    icon: Users,
  },
  'tenant-login': {
    title: 'Log In Credentials',
    description: 'Manage your login credentials',
    icon: Settings,
  },
  'manage-profile': {
    title: 'Manage Profile',
    description: 'Update your profile information',
    icon: Users,
  },
  'view-room': {
    title: 'View Assigned Room',
    description: 'View your assigned room details',
    icon: Building2,
  },
  'view-contract': {
    title: 'View Contract Info',
    description: 'View your contract information',
    icon: FileText,
  },
  'payment-history': {
    title: 'View Payment History',
    description: 'View your payment history',
    icon: CreditCard,
  },
  'payment-records': {
    title: 'View Payment Records',
    description: 'View detailed payment records',
    icon: CreditCard,
  },
  'submit-requests': {
    title: 'Submit Requests',
    description: 'Submit maintenance requests',
    icon: Wrench,
  },
  'track-request-status': {
    title: 'Track Status',
    description: 'Track your maintenance request status',
    icon: Wrench,
  },
  'receive-announcements': {
    title: 'Receive Announcements',
    description: 'View announcements from management',
    icon: FileText,
  },
  'receive-reminders': {
    title: 'Receive Reminders',
    description: 'View payment reminders',
    icon: FileText,
  },
  'receive-alerts': {
    title: 'Receive Expiry Alerts',
    description: 'View contract expiration alerts',
    icon: FileText,
  },
};

export function GenericPage() {
  const { pageId } = useParams();

  // Route specific pages to their components
  if (pageId === 'tenant-approval') {
    return <TenantApproval />;
  }

  if (pageId === 'assign-tasks' || pageId === 'view-requests' || pageId === 'track-maintenance-status') {
    return <MaintenanceManagement />;
  }

  if (pageId === 'track-payments' || pageId === 'manage-contracts' || pageId === 'monitor-expirations') {
    return <TrackPayments />;
  }

  if (pageId === 'print-occupancy' || pageId === 'print-payments' || pageId === 'print-tenants' || pageId === 'print-maintenance') {
    return <ReportsAnalytics />;
  }

  if (pageId === 'register-account' || pageId === 'identify-role') {
    return <RegisterAccount />;
  }

  if (pageId === 'manage-tenants') {
    return <ManageTenants />;
  }

  if (pageId === 'dorm-info' || pageId === 'assign-tenants' || pageId === 'monitor-availability') {
    return <RoomInventory />;
  }

  if (pageId === 'send-announcements' || pageId === 'send-payment-reminders' || pageId === 'send-expiry-alerts') {
    return <NotificationManagement />;
  }

  if (pageId === 'login-credentials') {
    return <LoginCredentials />;
  }

  if (pageId === 'track-status') {
    return <TrackStatus />;
  }

  if (pageId === 'monitor-checkin') {
    return <CheckInOut />;
  }

  const config = pageId ? pageConfig[pageId] : null;

  if (!config) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">The requested page does not exist.</p>
        </div>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
          <div className="bg-primary/10 p-3 lg:p-4 rounded-xl">
            <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-1 lg:mb-2">{config.title}</h2>
            <p className="text-sm lg:text-base text-muted-foreground">{config.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200 shadow-sm">
          <div className="text-center py-8 lg:py-12">
            <div className="bg-gray-100 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
            </div>
            <h3 className="text-lg lg:text-xl mb-2 text-gray-900">Coming Soon</h3>
            <p className="text-sm lg:text-base text-muted-foreground max-w-md mx-auto">
              This feature is currently under development. Check back soon for updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
