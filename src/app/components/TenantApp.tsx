import { Home, FileText, Wrench, User, CreditCard, Upload, CheckCircle, DollarSign, AlertCircle, LogOut, Edit, GraduationCap, Bell } from 'lucide-react';
import { useState } from 'react';
import { TenantHome } from './TenantHome';
import { MaintenanceRequest } from './MaintenanceRequest';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: FileText, label: 'Services', id: 'contract' },
  { icon: CreditCard, label: 'Payments', id: 'payments' },
  { icon: Wrench, label: 'Maintenance', id: 'repairs' },
  { icon: User, label: 'Profile', id: 'profile' },
];

export function TenantApp() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('home');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMonth, setPaymentMonth] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<File | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Angel',
    email: 'angelbenitezayado477@gmail.com',
    phone: '+63 917 123 4567',
    tenantId: 'TEN-2024-1234',
  });
  const [emergencyContact, setEmergencyContact] = useState({
    name: 'Maria Ayado',
    relationship: 'Mother',
    phone: '+63 918 987 6543',
  });

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedReceipt(e.target.files[0]);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payment of ₱${paymentAmount} for ${paymentMonth} submitted!`);
    setPaymentAmount('');
    setPaymentMonth('');
    setSelectedReceipt(null);
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditingProfile(false);
  };

  const paymentHistory = [
    { month: 'May 2026', amount: 5500, date: '2026-05-01', status: 'paid' },
    { month: 'Apr 2026', amount: 5500, date: '2026-04-01', status: 'paid' },
    { month: 'Mar 2026', amount: 5500, date: '2026-03-01', status: 'paid' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-72 bg-primary shadow-xl">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/10 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-white text-base leading-tight font-medium">Tenant Portal</h1>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                  isActive
                    ? 'bg-white text-primary shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <div>
                <p className="text-white text-sm font-medium">Angel</p>
                <p className="text-white/60 text-xs">Tenant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pb-20 lg:pb-0">
          {activeView === 'home' && <TenantHome onNavigate={setActiveView} />}

          {activeView === 'payments' && (
            <div className="p-4 lg:p-8">
              <h2 className="text-2xl lg:text-3xl mb-6">Payments</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Send Payment Form */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl mb-4">Send Payment</h3>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2 font-medium">Payment Month</label>
                      <input
                        type="text"
                        value={paymentMonth}
                        onChange={(e) => setPaymentMonth(e.target.value)}
                        placeholder="e.g., June 2026"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2 font-medium">Amount (₱)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="5500.00"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 font-medium">Upload Receipt/Reference</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          id="receipt-upload"
                          onChange={handleReceiptChange}
                          accept="image/*,.pdf"
                          className="hidden"
                        />
                        <label htmlFor="receipt-upload" className="cursor-pointer">
                          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          {selectedReceipt ? (
                            <div>
                              <p className="text-sm font-medium">{selectedReceipt.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium">Click to upload</p>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or PDF</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium shadow-sm"
                    >
                      Submit Payment
                    </button>
                  </form>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {paymentHistory.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{payment.month}</p>
                            <span className="px-2 py-1 rounded-full text-xs bg-success/10 text-success font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              PAID
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">₱{payment.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'repairs' && <MaintenanceRequest />}

          {activeView === 'contract' && (
            <div className="p-4 lg:p-8">
              <h2 className="text-2xl lg:text-3xl mb-6">My Room & Contract</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Room Card */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 border-2 border-primary shadow-lg text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">Room 302</h3>
                      <p className="text-white/80">Studio • 3rd Floor</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Home className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-white/70 text-xs mb-1">Bed Number</p>
                      <p className="font-semibold">Bed 1</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs mb-1">Building</p>
                      <p className="font-semibold">Main Dorm</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs mb-1">Monthly Rate</p>
                      <p className="font-semibold text-lg">₱5,500</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs mb-1">Move-in</p>
                      <p className="font-semibold">Aug 15, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Contract Details */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Contract Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-muted-foreground">Contract Period</span>
                      <span className="font-medium text-sm">Aug 15, 2025 - May 15, 2026</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-muted-foreground">Monthly Rent</span>
                      <span className="font-medium text-primary">₱5,500</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-muted-foreground">Security Deposit</span>
                      <span className="font-medium">₱5,500</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-muted-foreground">Contract Status</span>
                      <span className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/20">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Days Remaining</span>
                      <span className="font-medium">8 days</span>
                    </div>
                  </div>

                  {/* Contract Renewal Notice */}
                  <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="font-medium text-warning text-sm">Contract Expiring Soon</p>
                        <p className="text-xs text-gray-700 mt-1">
                          Your contract expires in 8 days. Please visit the office to renew.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'profile' && (
            <div className="p-4 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl lg:text-3xl">My Profile</h2>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 flex flex-col lg:flex-row items-center gap-6">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-medium">
                    A
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-medium text-xl">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground">Tenant • {profileData.tenantId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg mb-4 font-medium">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Tenant ID</label>
                        <input
                          type="text"
                          value={profileData.tenantId}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg mb-4 font-medium">Emergency Contact</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Contact Name</label>
                        <input
                          type="text"
                          value={emergencyContact.name}
                          onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Relationship</label>
                        <input
                          type="text"
                          value={emergencyContact.relationship}
                          onChange={(e) =>
                            setEmergencyContact({ ...emergencyContact, relationship: e.target.value })
                          }
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={emergencyContact.phone}
                          onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                          disabled={!isEditingProfile}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-gray-50 disabled:text-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 lg:flex-none lg:px-8 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium shadow-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 lg:flex-none lg:px-8 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Log Out Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      localStorage.removeItem('currentUser');
                      navigate('/login');
                    }}
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-medium shadow-sm"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-lg z-50">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    isActive ? 'text-primary bg-primary/5' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
