import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, User, Mail, Lock, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as 'admin' | 'tenant' | '',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role!');
      return;
    }

    // In production, this would save to database
    toast.success(`Account created successfully for ${formData.fullName}!`);

    // Redirect to login
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Branding */}
        <div className="w-2/5 bg-primary p-12 flex flex-col justify-center text-white">
          <div className="mb-8">
            <div className="bg-white/10 p-4 rounded-2xl inline-block mb-6">
              <GraduationCap className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-semibold mb-4">Join Our Dorm Community</h1>
            <p className="text-white/80 text-lg">
              Create an account to access the tenant management system
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-3">Already have an account?</h3>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-3 bg-white text-primary rounded-xl hover:bg-white/90 transition-all font-medium"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-3/5 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Fill in the details to register</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Identify Role *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    formData.role === 'admin'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Administrator</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Full system access for property management
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, role: 'tenant' })}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    formData.role === 'tenant'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Tenant</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Access to tenant portal and services
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium text-lg shadow-lg"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="text-center mb-6">
            <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">
              <GraduationCap className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600 text-sm">Register to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'tenant' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                required
              >
                <option value="">Select role...</option>
                <option value="admin">Administrator</option>
                <option value="tenant">Tenant</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              Already have an account? Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
