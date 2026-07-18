import { Check, X, User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface TenantApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  requestedRoom: string;
  appliedDate: string;
  category: 'Student' | 'Employee';
  status: 'pending' | 'approved' | 'rejected';
}

export function TenantApproval() {
  const [applications, setApplications] = useState<TenantApplication[]>([
    {
      id: '1',
      name: 'Sarah Martinez',
      email: 'sarah.martinez@university.edu',
      phone: '+63 917 123 4567',
      requestedRoom: 'Room 401',
      appliedDate: '2026-04-28',
      category: 'Student',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Carlos Reyes',
      email: 'carlos.reyes@company.com',
      phone: '+63 918 234 5678',
      requestedRoom: 'Room 203',
      appliedDate: '2026-04-29',
      category: 'Employee',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Ana De La Cruz',
      email: 'ana.delacruz@university.edu',
      phone: '+63 919 345 6789',
      requestedRoom: 'Room 105',
      appliedDate: '2026-04-30',
      category: 'Student',
      status: 'pending',
    },
    {
      id: '4',
      name: 'David Santos',
      email: 'd.santos@company.com',
      phone: '+63 920 456 7890',
      requestedRoom: 'Room 308',
      appliedDate: '2026-05-01',
      category: 'Employee',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string, name: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'approved' as const } : app
    ));
    toast.success(`${name} has been approved!`);
  };

  const handleReject = (id: string, name: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'rejected' as const } : app
    ));
    toast.error(`${name} has been rejected.`);
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const processedApplications = applications.filter(app => app.status !== 'pending');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Tenant Registration/Approval</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Review and approve new tenant applications
          </p>
        </div>

        {/* Pending Applications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg lg:text-xl">
              Pending Applications ({pendingApplications.length})
            </h3>
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Requested Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{application.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {application.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{application.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{application.requestedRoom}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(application.id, application.name)}
                          className="px-4 py-2 bg-success text-white rounded-xl hover:bg-success/90 flex items-center gap-2 text-sm transition-all"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(application.id, application.name)}
                          className="px-4 py-2 bg-danger text-white rounded-xl hover:bg-danger/90 flex items-center gap-2 text-sm transition-all"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pendingApplications.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No pending applications
              </div>
            )}
          </div>

          {/* Mobile View - Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {pendingApplications.map((application) => (
              <div key={application.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{application.name}</h4>
                    <p className="text-sm text-muted-foreground">{application.category}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{application.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{application.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{application.requestedRoom}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleApprove(application.id, application.name)}
                    className="flex-1 px-4 py-2 bg-success text-white rounded-xl hover:bg-success/90 flex items-center justify-center gap-2 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(application.id, application.name)}
                    className="flex-1 px-4 py-2 bg-danger text-white rounded-xl hover:bg-danger/90 flex items-center justify-center gap-2 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingApplications.length === 0 && (
              <div className="px-4 py-12 text-center text-muted-foreground">
                No pending applications
              </div>
            )}
          </div>
        </div>

        {/* Processed Applications */}
        {processedApplications.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg lg:text-xl">Recently Processed</h3>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {processedApplications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{application.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {application.requestedRoom}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          application.status === 'approved'
                            ? 'bg-success/10 text-success'
                            : 'bg-danger/10 text-danger'
                        }`}
                      >
                        {application.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{application.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
