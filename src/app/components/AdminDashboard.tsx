import { Building2, DollarSign, FileText, Wrench, UserPlus, Clock, AlertTriangle } from 'lucide-react';
import { StatCard } from './StatCard';
import { DataTable } from './DataTable';
import { StatusBadge } from './StatusBadge';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

const occupancyData = [
  { name: 'Occupied', value: 156, color: '#800000' },
  { name: 'Vacant', value: 24, color: '#e5e7eb' },
];

const recentPaymentsData = [
  { id: 'sep-2025', month: 'Sep', amount: 108000 },
  { id: 'oct-2025', month: 'Oct', amount: 112500 },
  { id: 'nov-2025', month: 'Nov', amount: 118200 },
  { id: 'dec-2025', month: 'Dec', amount: 115800 },
  { id: 'jan-2026', month: 'Jan', amount: 121400 },
  { id: 'feb-2026', month: 'Feb', amount: 119600 },
  { id: 'mar-2026', month: 'Mar', amount: 124800 },
];

const tenantListData = [
  { id: 't1', name: 'James Ayunting', room: 'Room 301', category: 'Student', status: 'active', rentDue: 'Paid', contract: 'Active' },
  { id: 't2', name: 'Denver Paul', room: 'Room 405', category: 'Employee', status: 'active', rentDue: 'Paid', contract: 'Active' },
  { id: 't3', name: 'Maria Santos', room: 'Room 212', category: 'Student', status: 'active', rentDue: 'Pending', contract: 'Active' },
  { id: 't4', name: 'Carlos Reyes', room: 'Room 518', category: 'Employee', status: 'overdue', rentDue: 'Overdue', contract: 'Active' },
  { id: 't5', name: 'Isabella Cruz', room: 'Room 103', category: 'Student', status: 'active', rentDue: 'Paid', contract: 'Expiring Soon' },
  { id: 't6', name: 'Miguel Torres', room: 'Room 607', category: 'Employee', status: 'pending', rentDue: 'Pending', contract: 'Active' },
  { id: 't7', name: 'Sofia Gonzales', room: 'Room 220', category: 'Student', status: 'active', rentDue: 'Paid', contract: 'Active' },
  { id: 't8', name: 'Juan Dela Cruz', room: 'Room 314', category: 'Employee', status: 'overdue', rentDue: 'Overdue', contract: 'Active' },
  { id: 't9', name: 'Ana Bautista', room: 'Room 428', category: 'Student', status: 'active', rentDue: 'Paid', contract: 'Active' },
  { id: 't10', name: 'Rafael Mendoza', room: 'Room 512', category: 'Employee', status: 'active', rentDue: 'Paid', contract: 'Expiring Soon' },
];

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({ name: '', room: '', email: '', category: '' });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Tenant added successfully!');
    setIsAddTenantOpen(false);
    setNewTenant({ name: '', room: '', email: '', category: '' });
  };

  const columns = [
    { key: 'name', label: 'Tenant Name' },
    { key: 'room', label: 'Room Number' },
    { key: 'category', label: 'Category' },
    { key: 'rentDue', label: 'Rent Status' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <StatusBadge status={status as any}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </StatusBadge>
      ),
    },
    { key: 'contract', label: 'Contract' },
  ];

  const filteredData = tenantListData.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Dorm Tenant Management System</h2>
          <p className="text-sm lg:text-base text-muted-foreground">Monitor occupancy, payments, contracts, and maintenance across all dormitories.</p>
        </div>

        {/* FDD-based Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <StatCard
            title="Occupancy Rate (%)"
            value="87%"
            icon={Building2}
            trend={{ value: '156 of 180 rooms occupied', isPositive: true }}
            color="bg-primary"
          />
          <StatCard
            title="Pending Payments (Count)"
            value="15"
            icon={Clock}
            trend={{ value: '₱42,500 outstanding', isPositive: false }}
            color="bg-warning"
          />
          <StatCard
            title="Expiring Contracts (Count)"
            value="8"
            icon={FileText}
            trend={{ value: 'Within next 30 days', isPositive: false }}
            color="bg-accent"
          />
          <StatCard
            title="Open Maintenance Tasks (Count)"
            value="12"
            icon={Wrench}
            trend={{ value: '3 urgent tasks', isPositive: false }}
            color="bg-danger"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          {/* Tenant Directory Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-3">
                <h3 className="text-lg lg:text-xl">Tenant Directory</h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="w-full sm:w-72 lg:w-64">
                    <SearchBar
                      placeholder="Search by name or room number..."
                      value={searchQuery}
                      onChange={setSearchQuery}
                    />
                  </div>
                  <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
                    <DialogTrigger asChild>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-sm whitespace-nowrap">
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Tenant</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Tenant</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddTenant} className="space-y-4 mt-4">
                        <div>
                          <label className="block text-sm mb-2">Tenant Name</label>
                          <input
                            type="text"
                            value={newTenant.name}
                            onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            placeholder="Enter tenant name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Room Number</label>
                          <input
                            type="text"
                            value={newTenant.room}
                            onChange={(e) => setNewTenant({ ...newTenant, room: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            placeholder="e.g., Room 301"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Email Address</label>
                          <input
                            type="email"
                            value={newTenant.email}
                            onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            placeholder="tenant@email.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Category</label>
                          <select
                            value={newTenant.category}
                            onChange={(e) => setNewTenant({ ...newTenant, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            required
                          >
                            <option value="">Select category...</option>
                            <option value="Student">Student</option>
                            <option value="Employee">Employee</option>
                          </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                          >
                            Add Tenant
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddTenantOpen(false)}
                            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <DataTable columns={columns} data={filteredData} />
            </div>
          </div>

          {/* Occupancy Overview Donut Chart */}
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg lg:text-xl mb-4">Occupancy Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart key="occupancy-chart">
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  key="pie-occupancy"
                >
                  {occupancyData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend key="legend" />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm text-muted-foreground">Occupied Rooms</span>
                <span className="text-sm lg:text-base font-medium">156 / 180</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm text-muted-foreground">Vacant Rooms</span>
                <span className="text-sm lg:text-base font-medium">24 / 180</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs lg:text-sm text-muted-foreground">Occupancy Rate</span>
                <span className="text-sm lg:text-base font-medium text-primary">87%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments Line Chart */}
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-2">
            <h3 className="text-lg lg:text-xl">Recent Payments</h3>
            <span className="text-xs lg:text-sm text-muted-foreground">Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentPaymentsData} key="payments-chart">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" key="grid" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                key="x-axis"
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`}
                key="y-axis"
              />
              <Tooltip
                formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                key="tooltip"
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#800000"
                strokeWidth={3}
                dot={{ fill: '#800000', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
                key="line-amount"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground mb-1">Current Month</p>
                <p className="text-base lg:text-lg font-medium text-primary">₱124,800</p>
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground mb-1">Average (7 months)</p>
                <p className="text-base lg:text-lg font-medium">₱117,186</p>
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground mb-1">Growth</p>
                <p className="text-base lg:text-lg font-medium text-success">+8.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}