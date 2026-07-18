import { Send, Megaphone, CreditCard, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function NotificationManagement() {
  const [notificationType, setNotificationType] = useState<'announcement' | 'payment' | 'expiry'>('announcement');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState<'all' | 'students' | 'employees' | 'specific'>('all');
  const [specificRooms, setSpecificRooms] = useState('');

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    const typeLabel = notificationType === 'announcement' ? 'Announcement' : notificationType === 'payment' ? 'Payment Reminder' : 'Expiry Alert';
    toast.success(`${typeLabel} sent successfully to ${recipients === 'all' ? 'all tenants' : recipients}!`);
    setMessage('');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Notification Management</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Send announcements, payment reminders, and expiry alerts to tenants
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notification Type Selector */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg mb-4">Notification Type</h3>

            <div className="space-y-3">
              <div
                onClick={() => setNotificationType('announcement')}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  notificationType === 'announcement'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notificationType === 'announcement' ? 'bg-primary' : 'bg-gray-100'}`}>
                    <Megaphone className={`w-5 h-5 ${notificationType === 'announcement' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Announcements</h4>
                    <p className="text-sm text-muted-foreground">
                      Send general updates and important notices to tenants
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setNotificationType('payment')}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  notificationType === 'payment'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notificationType === 'payment' ? 'bg-primary' : 'bg-gray-100'}`}>
                    <CreditCard className={`w-5 h-5 ${notificationType === 'payment' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Payment Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Remind tenants about upcoming or overdue payments
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setNotificationType('expiry')}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  notificationType === 'expiry'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notificationType === 'expiry' ? 'bg-primary' : 'bg-gray-100'}`}>
                    <AlertCircle className={`w-5 h-5 ${notificationType === 'expiry' ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Expiry Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Alert tenants about expiring contracts or documents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Composer */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg mb-4">Compose Message</h3>

            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Recipients</label>
                <select
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="all">All Tenants</option>
                  <option value="students">Students Only</option>
                  <option value="employees">Employees Only</option>
                  <option value="specific">Specific Rooms</option>
                </select>
              </div>

              {recipients === 'specific' && (
                <div>
                  <label className="block text-sm mb-2">Room Numbers (comma-separated)</label>
                  <input
                    type="text"
                    value={specificRooms}
                    onChange={(e) => setSpecificRooms(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="e.g., 101, 102, 205"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  placeholder={
                    notificationType === 'announcement'
                      ? 'Enter announcement subject'
                      : notificationType === 'payment'
                      ? 'Payment Reminder'
                      : 'Contract Expiry Notice'
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white resize-none"
                  placeholder={
                    notificationType === 'announcement'
                      ? 'Write your announcement here...'
                      : notificationType === 'payment'
                      ? 'This is a reminder that your rent payment is due...'
                      : 'Your contract is expiring soon. Please renew...'
                  }
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-medium mb-2">Preview</h4>
                <div className="text-sm text-muted-foreground">
                  {message || 'Your message will appear here...'}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Notification
              </button>
            </form>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium">Spring Break Notice</h4>
                    <span className="text-xs text-muted-foreground">May 1, 2026</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Dorms will remain open during spring break. Limited dining services.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">All Tenants</span>
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Sent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium">May Rent Payment Reminder</h4>
                    <span className="text-xs text-muted-foreground">Apr 28, 2026</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your monthly rent for May is due on May 1st, 2026.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">All Tenants</span>
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Sent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-danger" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium">Contract Expiry Alert</h4>
                    <span className="text-xs text-muted-foreground">Apr 25, 2026</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your contract is expiring in 30 days. Please contact management to renew.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">8 Tenants</span>
                    <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Sent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
