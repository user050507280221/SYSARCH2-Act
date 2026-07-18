import { CreditCard, Wrench, FileText, Bell } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  id: string;
}

const quickActions: QuickAction[] = [
  { icon: CreditCard, label: 'Pay Rent', description: 'Make a payment', color: 'bg-primary', id: 'pay' },
  { icon: Wrench, label: 'Request Repair', description: 'Report an issue', color: 'bg-secondary', id: 'repairs' },
];

interface TenantHomeProps {
  onNavigate: (view: string) => void;
}

export function TenantHome({ onNavigate }: TenantHomeProps) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Payment submitted successfully!');
    setIsPaymentOpen(false);
    setPaymentMethod('');
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl mb-1">Hello, Angel! 👋</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Welcome to your dorm portal</p>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white mb-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm mb-1">Your Room</p>
            <p className="text-3xl font-medium">Room 302</p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/80 text-sm mb-1">Rent Due</p>
            <p className="text-xl font-medium">March 30, 2026</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Monthly Rent</span>
            <span className="text-2xl font-medium">₱5,500</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-lg lg:text-xl">Quick Actions</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isPayRent = action.id === 'pay';
            
            if (isPayRent) {
              return (
                <Dialog key={action.id} open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all active:scale-[0.98] text-left">
                      <div className="flex items-center gap-4">
                        <div className={`${action.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg mb-1">{action.label}</h4>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Pay Monthly Rent</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePayment} className="space-y-4 mt-4">
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Room Number</span>
                          <span className="font-medium">Room 302</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Amount Due</span>
                          <span className="text-2xl font-medium text-primary">₱5,500</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Payment Method</label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                          required
                        >
                          <option value="">Select payment method...</option>
                          <option value="gcash">GCash</option>
                          <option value="paymaya">PayMaya</option>
                          <option value="bank">Bank Transfer</option>
                          <option value="cash">Cash Payment</option>
                        </select>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
                        >
                          Submit Payment
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPaymentOpen(false)}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              );
            }

            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`${action.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-1">{action.label}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="mb-4 text-lg">Recent Payments</h3>
          <div className="space-y-3">
            {[
              { month: 'February 2026', amount: '₱5,500', status: 'Paid', date: 'Feb 28' },
              { month: 'January 2026', amount: '₱5,500', status: 'Paid', date: 'Jan 30' },
              { month: 'December 2025', amount: '₱5,500', status: 'Paid', date: 'Dec 29' },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium">{payment.month}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{payment.amount}</p>
                  <p className="text-xs text-green-600 font-medium">{payment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h3 className="mb-4 text-lg">Latest Announcements</h3>
          <div className="space-y-3">
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl">
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-warning mt-1" />
                <div>
                  <p className="text-sm font-medium text-warning">Contract Renewal Reminder</p>
                  <p className="text-xs text-gray-700 mt-1">
                    Your contract expires on May 15, 2026. Please renew at the office.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">May 7, 2026</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="text-sm font-medium">Maintenance Schedule</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Water interruption on May 10 from 9 AM to 12 PM for pipe maintenance.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">May 5, 2026</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl">
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-accent mt-1" />
                <div>
                  <p className="text-sm font-medium">Community Event</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monthly tenant gathering on May 12 at the common area. Free snacks!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">May 3, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}