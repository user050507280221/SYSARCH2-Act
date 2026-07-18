import { LogIn, LogOut, Key, Calendar, User, Home } from 'lucide-react';
import { useState } from 'react';

interface CheckInOutRecord {
  id: string;
  tenantName: string;
  room: string;
  category: 'Student' | 'Employee';
  checkInDate: string;
  checkOutDate?: string;
  keyReturned: boolean;
  status: 'checked-in' | 'checked-out';
}

export function CheckInOut() {
  const [records] = useState<CheckInOutRecord[]>([
    {
      id: '1',
      tenantName: 'Angel',
      room: 'Room 302',
      category: 'Student',
      checkInDate: '2025-08-15',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '2',
      tenantName: 'James Ayunting',
      room: 'Room 301',
      category: 'Student',
      checkInDate: '2025-08-15',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '3',
      tenantName: 'Maria Santos',
      room: 'Room 212',
      category: 'Student',
      checkInDate: '2025-08-20',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '4',
      tenantName: 'Carlos Reyes',
      room: 'Room 518',
      category: 'Employee',
      checkInDate: '2025-09-01',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '5',
      tenantName: 'Isabella Cruz',
      room: 'Room 103',
      category: 'Student',
      checkInDate: '2025-09-01',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '6',
      tenantName: 'Denver Paul',
      room: 'Room 405',
      category: 'Employee',
      checkInDate: '2025-09-05',
      keyReturned: false,
      status: 'checked-in',
    },
    {
      id: '7',
      tenantName: 'Miguel Torres',
      room: 'Room 215',
      category: 'Student',
      checkInDate: '2025-08-15',
      checkOutDate: '2026-04-20',
      keyReturned: true,
      status: 'checked-out',
    },
    {
      id: '8',
      tenantName: 'Rosa Fernandez',
      room: 'Room 108',
      category: 'Student',
      checkInDate: '2025-08-20',
      checkOutDate: '2026-03-15',
      keyReturned: true,
      status: 'checked-out',
    },
    {
      id: '9',
      tenantName: 'Luis Ramos',
      room: 'Room 312',
      category: 'Employee',
      checkInDate: '2025-09-10',
      checkOutDate: '2026-02-28',
      keyReturned: false,
      status: 'checked-out',
    },
  ]);

  const checkedIn = records.filter((r) => r.status === 'checked-in');
  const checkedOut = records.filter((r) => r.status === 'checked-out');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Check-in / Check-out Monitor</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Track tenant check-in and check-out dates with key return status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Currently Checked In</p>
                <p className="text-2xl lg:text-3xl font-medium text-success">{checkedIn.length}</p>
              </div>
              <LogIn className="w-10 h-10 lg:w-12 lg:h-12 text-success" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Checked Out</p>
                <p className="text-2xl lg:text-3xl font-medium text-gray-600">{checkedOut.length}</p>
              </div>
              <LogOut className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Keys Not Returned</p>
                <p className="text-2xl lg:text-3xl font-medium text-danger">
                  {records.filter((r) => !r.keyReturned && r.status === 'checked-out').length}
                </p>
              </div>
              <Key className="w-10 h-10 lg:w-12 lg:h-12 text-danger" />
            </div>
          </div>
        </div>

        {/* Check-in/Check-out Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg lg:text-xl">All Records</h3>
          </div>
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
                    Check-in Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Check-out Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Key Return
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{record.tenantName}</div>
                          <div className="text-sm text-muted-foreground">{record.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-muted-foreground" />
                        <span>{record.room}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-success" />
                        <span>{new Date(record.checkInDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {record.checkOutDate ? (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span>{new Date(record.checkOutDate).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {record.status === 'checked-out' ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.keyReturned
                              ? 'bg-success/10 text-success border border-success/20'
                              : 'bg-danger/10 text-danger border border-danger/20'
                          }`}
                        >
                          {record.keyReturned ? 'Returned' : 'Not Returned'}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                          record.status === 'checked-in'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {record.status === 'checked-in' ? (
                          <LogIn className="w-3 h-3" />
                        ) : (
                          <LogOut className="w-3 h-3" />
                        )}
                        {record.status === 'checked-in' ? 'Checked In' : 'Checked Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Check-in/Check-out Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {records.map((record) => (
            <div key={record.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{record.tenantName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{record.room}</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 font-medium">
                    {record.category}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                    record.status === 'checked-in'
                      ? 'bg-success/10 text-success border border-success/20'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {record.status === 'checked-in' ? (
                    <LogIn className="w-3 h-3" />
                  ) : (
                    <LogOut className="w-3 h-3" />
                  )}
                  {record.status === 'checked-in' ? 'In' : 'Out'}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-success" />
                    {new Date(record.checkInDate).toLocaleDateString()}
                  </span>
                </div>
                {record.checkOutDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      {new Date(record.checkOutDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {record.status === 'checked-out' && (
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-muted-foreground">Key Return:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.keyReturned
                          ? 'bg-success/10 text-success border border-success/20'
                          : 'bg-danger/10 text-danger border border-danger/20'
                      }`}
                    >
                      {record.keyReturned ? 'Returned' : 'Not Returned'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
