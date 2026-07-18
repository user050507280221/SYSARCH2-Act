import { Edit, Trash2, Search, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  category: 'Student' | 'Employee';
  status: 'active' | 'inactive';
  moveInDate: string;
}

export function ManageTenants() {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: '1',
      name: 'Angel',
      email: 'angelbenitezayado477@gmail.com',
      phone: '+63 917 123 4567',
      room: 'Room 302',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-15',
    },
    {
      id: '2',
      name: 'James Ayunting',
      email: 'james.ayunting@email.com',
      phone: '+63 918 234 5678',
      room: 'Room 301',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-15',
    },
    {
      id: '3',
      name: 'Denver Paul',
      email: 'denver.paul@company.com',
      phone: '+63 919 345 6789',
      room: 'Room 405',
      category: 'Employee',
      status: 'active',
      moveInDate: '2025-09-01',
    },
    {
      id: '4',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+63 920 456 7890',
      room: 'Room 212',
      category: 'Student',
      status: 'active',
      moveInDate: '2025-08-20',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [editForm, setEditForm] = useState<Tenant | null>(null);

  const handleEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setEditForm({ ...tenant });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm) {
      setTenants(tenants.map(t => (t.id === editForm.id ? editForm : t)));
      toast.success(`${editForm.name}'s information updated successfully!`);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (tenant: Tenant) => {
    if (confirm(`Are you sure you want to delete ${tenant.name}?`)) {
      setTenants(tenants.filter(t => t.id !== tenant.id));
      toast.success(`${tenant.name} has been removed from the system.`);
    }
  };

  const filteredTenants = tenants.filter(
    tenant =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Manage Tenants</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            View and manage all tenant information
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, room, or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
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
                    Contact
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{tenant.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Since {new Date(tenant.moveInDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div>{tenant.email}</div>
                        <div className="text-muted-foreground">{tenant.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{tenant.room}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 font-medium">
                        {tenant.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tenant.status === 'active'
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(tenant)}
                          className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tenant)}
                          className="p-2 text-danger hover:bg-danger/5 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tenants Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{tenant.name}</h4>
                  <p className="text-sm text-muted-foreground">{tenant.room}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 font-medium">
                      {tenant.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tenant.status === 'active'
                          ? 'bg-success/10 text-success border border-success/20'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {tenant.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-1 mb-3">
                <p className="text-muted-foreground">{tenant.email}</p>
                <p className="text-muted-foreground">{tenant.phone}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tenant)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tenant)}
                  className="flex-1 px-4 py-2 bg-danger text-white rounded-xl hover:bg-danger/90 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Tenant Information</DialogTitle>
            </DialogHeader>
            {editForm && (
              <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Room</label>
                  <input
                    type="text"
                    value={editForm.room}
                    onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value as 'Student' | 'Employee' })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  >
                    <option value="Student">Student</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value as 'active' | 'inactive' })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
