import { Eye, EyeOff, Clock, User, Shield } from 'lucide-react';
import { useState } from 'react';

interface UserCredential {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'manager' | 'staff' | 'tenant';
  lastLogin: string;
  status: 'active' | 'inactive';
  category?: 'Student' | 'Employee';
}

export function LoginCredentials() {
  const [showPasswordId, setShowPasswordId] = useState<string | null>(null);

  const credentials: UserCredential[] = [
    {
      id: '1',
      username: 'angel.ayado',
      password: 'SecurePass123!',
      role: 'tenant',
      lastLogin: '2026-05-03 09:15:22',
      status: 'active',
      category: 'Student',
    },
    {
      id: '2',
      username: 'james.ayunting',
      password: 'MyPass2024#',
      role: 'tenant',
      lastLogin: '2026-05-03 08:45:10',
      status: 'active',
      category: 'Student',
    },
    {
      id: '3',
      username: 'maria.santos',
      password: 'Maria@Pass99',
      role: 'tenant',
      lastLogin: '2026-05-02 18:30:45',
      status: 'active',
      category: 'Student',
    },
    {
      id: '4',
      username: 'carlos.reyes',
      password: 'CarlosR#456',
      role: 'tenant',
      lastLogin: '2026-04-28 14:20:33',
      status: 'active',
      category: 'Employee',
    },
    {
      id: '5',
      username: 'isabella.cruz',
      password: 'Bella*Pass21',
      role: 'tenant',
      lastLogin: '2026-05-03 07:55:18',
      status: 'active',
      category: 'Student',
    },
    {
      id: '6',
      username: 'denver.paul',
      password: 'DenverP@789',
      role: 'tenant',
      lastLogin: '2026-05-02 22:10:05',
      status: 'active',
      category: 'Employee',
    },
    {
      id: '7',
      username: 'admin.angel',
      password: 'AdminSecure#2024',
      role: 'admin',
      lastLogin: '2026-05-03 10:00:00',
      status: 'active',
    },
  ];

  const maskPassword = (password: string) => {
    return '•'.repeat(password.length);
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-primary/10 text-primary border-primary/20',
      manager: 'bg-accent/10 text-accent border-accent/20',
      staff: 'bg-secondary/10 text-secondary border-secondary/20',
      tenant: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[role as keyof typeof colors] || colors.tenant;
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Log In Credentials</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Manage user login credentials and authentication
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg lg:text-xl">System Users</h3>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {credentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {cred.role === 'admin' ? (
                            <Shield className="w-5 h-5 text-primary" />
                          ) : (
                            <User className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium capitalize">
                            {cred.username.replace('.', ' ')}
                          </div>
                          {cred.category && (
                            <div className="text-sm text-muted-foreground">{cred.category}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {cred.username}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                          {showPasswordId === cred.id ? cred.password : maskPassword(cred.password)}
                        </code>
                        <button
                          onClick={() =>
                            setShowPasswordId(showPasswordId === cred.id ? null : cred.id)
                          }
                          className="p-1 hover:bg-gray-100 rounded transition-all"
                          title={showPasswordId === cred.id ? 'Hide' : 'Show'}
                        >
                          {showPasswordId === cred.id ? (
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(
                          cred.role
                        )}`}
                      >
                        {cred.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(cred.lastLogin).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cred.status === 'active'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {cred.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {credentials.map((cred) => (
              <div key={cred.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {cred.role === 'admin' ? (
                      <Shield className="w-6 h-6 text-primary" />
                    ) : (
                      <User className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium capitalize">{cred.username.replace('.', ' ')}</h4>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{cred.username}</code>
                    {cred.category && (
                      <p className="text-sm text-muted-foreground mt-1">{cred.category}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Password:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                        {showPasswordId === cred.id ? cred.password : maskPassword(cred.password)}
                      </code>
                      <button
                        onClick={() =>
                          setShowPasswordId(showPasswordId === cred.id ? null : cred.id)
                        }
                        className="p-1 hover:bg-gray-100 rounded transition-all"
                      >
                        {showPasswordId === cred.id ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(
                        cred.role
                      )}`}
                    >
                      {cred.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cred.status === 'active'
                          ? 'bg-success/10 text-success border border-success/20'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {cred.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Last login: {new Date(cred.lastLogin).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
