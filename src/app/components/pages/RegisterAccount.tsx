import { UserPlus, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function RegisterAccount() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    toast.success(`Account created successfully for ${formData.fullName}!`);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: '',
      category: '',
    });
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Register Account</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Create new user accounts for the system
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {/* Registration Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl">User Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="user@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="+63 XXX XXX XXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">User Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  required
                >
                  <option value="">Select category...</option>
                  <option value="Student">Student</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
              >
                Create Account
              </button>
            </form>
          </div>

          {/* Role Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl">Identify Role</h3>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Select the appropriate role for this user account
              </p>

              <div
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.role === 'admin'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === 'admin'}
                    onChange={() => setFormData({ ...formData, role: 'admin' })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Administrator</h4>
                    <p className="text-sm text-muted-foreground">
                      Full access to all system features including user management, property
                      management, payments, contracts, and reports.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, role: 'manager' })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.role === 'manager'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === 'manager'}
                    onChange={() => setFormData({ ...formData, role: 'manager' })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Property Manager</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to tenant management, room assignments, maintenance requests, and
                      basic reporting features.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, role: 'staff' })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.role === 'staff'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === 'staff'}
                    onChange={() => setFormData({ ...formData, role: 'staff' })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Maintenance Staff</h4>
                    <p className="text-sm text-muted-foreground">
                      Access limited to maintenance requests and task management. Can view and
                      update maintenance status.
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setFormData({ ...formData, role: 'tenant' })}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.role === 'tenant'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="role"
                    checked={formData.role === 'tenant'}
                    onChange={() => setFormData({ ...formData, role: 'tenant' })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Tenant</h4>
                    <p className="text-sm text-muted-foreground">
                      Tenant portal access for viewing room info, submitting payments, requesting
                      maintenance, and viewing announcements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <h3 className="text-lg mb-4">User Information</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="user@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="+63 XXX XXX XXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">User Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                required
              >
                <option value="">Select category...</option>
                <option value="Student">Student</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                required
              >
                <option value="">Select role...</option>
                <option value="admin">Administrator</option>
                <option value="manager">Property Manager</option>
                <option value="staff">Maintenance Staff</option>
                <option value="tenant">Tenant</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
