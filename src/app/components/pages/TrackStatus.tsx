import { CheckCircle, Clock, XCircle, User, Calendar, Home } from 'lucide-react';
import { useState } from 'react';

interface TenantStatus {
  id: string;
  name: string;
  room: string;
  category: 'Student' | 'Employee';
  status: 'active' | 'pending' | 'evicted';
  moveInDate: string;
  contractEnd: string;
  lastPayment?: string;
  reason?: string;
}

export function TrackStatus() {
  const [tenants] = useState<TenantStatus[]>([
    {
      id: '1',
      name: 'Angel',
      room: 'Room 302',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-15',
      contractEnd: '2026-05-15',
      lastPayment: '2026-05-01',
    },
    {
      id: '2',
      name: 'James Ayunting',
      room: 'Room 301',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-15',
      contractEnd: '2026-05-15',
      lastPayment: '2026-04-30',
    },
    {
      id: '3',
      name: 'Maria Santos',
      room: 'Room 212',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-20',
      contractEnd: '2026-05-20',
      lastPayment: '2026-04-25',
    },
    {
      id: '4',
      name: 'Carlos Reyes',
      room: 'Room 518',
      category: 'Employee',
      status: 'pending',
      moveInDate: '2026-05-10',
      contractEnd: '2027-05-10',
      reason: 'Awaiting security deposit',
    },
    {
      id: '5',
      name: 'Isabella Cruz',
      room: 'Room 103',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-09-01',
      contractEnd: '2026-06-01',
      lastPayment: '2026-05-01',
    },
    {
      id: '6',
      name: 'Miguel Torres',
      room: 'Room 215',
      category: 'Student',
      status: 'evicted',
      moveInDate: '2025-08-15',
      contractEnd: '2026-05-15',
      reason: 'Non-payment for 3 months',
    },
    {
      id: '7',
      name: 'Sofia Gonzales',
      room: 'Room 408',
      category: 'Student',
      status: 'pending',
      moveInDate: '2026-05-15',
      contractEnd: '2027-05-15',
      reason: 'Documents under review',
    },
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-success/10 text-success border-success/20',
          icon: CheckCircle,
          label: 'Active',
        };
      case 'pending':
        return {
          color: 'bg-warning/10 text-warning border-warning/20',
          icon: Clock,
          label: 'Pending',
        };
      case 'evicted':
        return {
          color: 'bg-danger/10 text-danger border-danger/20',
          icon: XCircle,
          label: 'Evicted',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: User,
          label: status,
        };
    }
  };

  const activeTenants = tenants.filter((t) => t.status === 'active');
  const pendingTenants = tenants.filter((t) => t.status === 'pending');
  const evictedTenants = tenants.filter((t) => t.status === 'evicted');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Track Tenant Status</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Monitor tenant status and activity across all properties
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active</p>
                <p className="text-2xl lg:text-3xl font-medium text-success">
                  {activeTenants.length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-success" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl lg:text-3xl font-medium text-warning">
                  {pendingTenants.length}
                </p>
              </div>
              <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-warning" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Evicted</p>
                <p className="text-2xl lg:text-3xl font-medium text-danger">
                  {evictedTenants.length}
                </p>
              </div>
              <XCircle className="w-10 h-10 lg:w-12 lg:h-12 text-danger" />
            </div>
          </div>
        </div>

        {/* Tenants Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Contract Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tenants.map((tenant) => {
                  const statusConfig = getStatusConfig(tenant.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={tenant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="font-medium">{tenant.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-muted-foreground" />
                          <span>{tenant.room}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 font-medium">
                          {tenant.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${statusConfig.color}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(tenant.moveInDate).toLocaleDateString()} -{' '}
                              {new Date(tenant.contractEnd).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {tenant.lastPayment && (
                            <div className="text-muted-foreground">
                              Last payment: {new Date(tenant.lastPayment).toLocaleDateString()}
                            </div>
                          )}
                          {tenant.reason && (
                            <div className="text-warning font-medium">{tenant.reason}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tenants Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {tenants.map((tenant) => {
            const statusConfig = getStatusConfig(tenant.status);
            const StatusIcon = statusConfig.icon;
            return (
              <div key={tenant.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{tenant.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{tenant.room}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${statusConfig.color}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 font-medium">
                      {tenant.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Move-in:</span>
                    <span>{new Date(tenant.moveInDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Contract ends:</span>
                    <span>{new Date(tenant.contractEnd).toLocaleDateString()}</span>
                  </div>
                  {tenant.lastPayment && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last payment:</span>
                      <span>{new Date(tenant.lastPayment).toLocaleDateString()}</span>
                    </div>
                  )}
                  {tenant.reason && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-warning font-medium">{tenant.reason}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
