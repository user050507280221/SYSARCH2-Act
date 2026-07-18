import { Building2, User, UserPlus, DoorOpen, DoorClosed } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: 'available' | 'occupied';
  tenant?: string;
  monthlyRent: number;
  capacity: number;
}

export function RoomInventory() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '101', floor: 1, type: 'Studio', status: 'occupied', tenant: 'Angel', monthlyRent: 5500, capacity: 1 },
    { id: '2', number: '102', floor: 1, type: 'Studio', status: 'available', monthlyRent: 5500, capacity: 1 },
    { id: '3', number: '103', floor: 1, type: '1BR', status: 'available', monthlyRent: 6500, capacity: 2 },
    { id: '4', number: '104', floor: 1, type: '1BR', status: 'occupied', tenant: 'Maria Santos', monthlyRent: 6500, capacity: 2 },
    { id: '5', number: '105', floor: 1, type: 'Studio', status: 'available', monthlyRent: 5500, capacity: 1 },
    { id: '6', number: '201', floor: 2, type: '2BR', status: 'occupied', tenant: 'Carlos Reyes', monthlyRent: 8000, capacity: 4 },
    { id: '7', number: '202', floor: 2, type: '2BR', status: 'available', monthlyRent: 8000, capacity: 4 },
    { id: '8', number: '203', floor: 2, type: '1BR', status: 'available', monthlyRent: 6500, capacity: 2 },
    { id: '9', number: '204', floor: 2, type: 'Studio', status: 'occupied', tenant: 'Isabella Cruz', monthlyRent: 5500, capacity: 1 },
    { id: '10', number: '205', floor: 2, type: '2BR', status: 'available', monthlyRent: 8000, capacity: 4 },
    { id: '11', number: '301', floor: 3, type: '2BR', status: 'occupied', tenant: 'James Ayunting', monthlyRent: 8000, capacity: 4 },
    { id: '12', number: '302', floor: 3, type: '2BR', status: 'available', monthlyRent: 8000, capacity: 4 },
    { id: '13', number: '303', floor: 3, type: '1BR', status: 'available', monthlyRent: 6500, capacity: 2 },
    { id: '14', number: '304', floor: 3, type: 'Studio', status: 'available', monthlyRent: 5500, capacity: 1 },
    { id: '15', number: '305', floor: 3, type: '2BR', status: 'occupied', tenant: 'Denver Paul', monthlyRent: 8000, capacity: 4 },
  ]);

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [assignForm, setAssignForm] = useState({
    tenantName: '',
    email: '',
    phone: '',
    moveInDate: '',
  });

  const handleAssignTenant = (room: Room) => {
    setSelectedRoom(room);
    setAssignForm({ tenantName: '', email: '', phone: '', moveInDate: '' });
    setIsAssignDialogOpen(true);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoom && assignForm.tenantName) {
      setRooms(
        rooms.map((room) =>
          room.id === selectedRoom.id
            ? { ...room, status: 'occupied' as const, tenant: assignForm.tenantName }
            : room
        )
      );
      toast.success(`${assignForm.tenantName} assigned to Room ${selectedRoom.number}!`);
      setIsAssignDialogOpen(false);
    }
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    occupancyRate: Math.round((rooms.filter((r) => r.status === 'occupied').length / rooms.length) * 100),
  };

  const groupedByFloor = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, Room[]>);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Room Inventory</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Monitor room availability and assign tenants
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Rooms</p>
                <p className="text-2xl lg:text-3xl font-medium">{stats.total}</p>
              </div>
              <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available</p>
                <p className="text-2xl lg:text-3xl font-medium text-success">{stats.available}</p>
              </div>
              <DoorOpen className="w-10 h-10 lg:w-12 lg:h-12 text-success" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Occupied</p>
                <p className="text-2xl lg:text-3xl font-medium text-danger">{stats.occupied}</p>
              </div>
              <DoorClosed className="w-10 h-10 lg:w-12 lg:h-12 text-danger" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Occupancy</p>
                <p className="text-2xl lg:text-3xl font-medium text-primary">{stats.occupancyRate}%</p>
              </div>
              <Building2 className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-6">
          <h3 className="text-lg lg:text-xl mb-4">Room Grid</h3>

          <div className="space-y-8">
            {Object.entries(groupedByFloor)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([floor, floorRooms]) => (
                <div key={floor}>
                  <h4 className="font-medium text-gray-700 mb-4">Floor {floor}</h4>

                  {/* Desktop Grid */}
                  <div className="hidden lg:grid lg:grid-cols-5 gap-4">
                    {floorRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`rounded-xl p-4 border-2 transition-all ${
                          room.status === 'available'
                            ? 'bg-success/10 border-success hover:shadow-lg'
                            : 'bg-danger/10 border-danger'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-medium text-gray-900">Room {room.number}</div>
                          {room.status === 'available' ? (
                            <DoorOpen className="w-5 h-5 text-success" />
                          ) : (
                            <DoorClosed className="w-5 h-5 text-danger" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{room.type}</div>
                        <div className="text-sm font-medium text-gray-900 mb-2">₱{room.monthlyRent.toLocaleString()}/mo</div>
                        <div className="text-xs text-gray-600 mb-2">Capacity: {room.capacity}</div>
                        {room.tenant && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-2 pt-2 border-t border-current/20">
                            <User className="w-3 h-3" />
                            <span className="truncate">{room.tenant}</span>
                          </div>
                        )}
                        {room.status === 'available' && (
                          <button
                            onClick={() => handleAssignTenant(room)}
                            className="w-full mt-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-xs flex items-center justify-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile List */}
                  <div className="lg:hidden space-y-3">
                    {floorRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`rounded-xl p-4 border-2 ${
                          room.status === 'available'
                            ? 'bg-success/10 border-success'
                            : 'bg-danger/10 border-danger'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium text-gray-900">Room {room.number}</div>
                            <div className="text-sm text-gray-600">{room.type}</div>
                          </div>
                          {room.status === 'available' ? (
                            <DoorOpen className="w-6 h-6 text-success" />
                          ) : (
                            <DoorClosed className="w-6 h-6 text-danger" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Monthly Rent:</span>
                          <span className="font-medium">₱{room.monthlyRent.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{room.capacity} persons</span>
                        </div>
                        {room.tenant && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <User className="w-4 h-4" />
                            <span>{room.tenant}</span>
                          </div>
                        )}
                        {room.status === 'available' && (
                          <button
                            onClick={() => handleAssignTenant(room)}
                            className="w-full mt-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />
                            Assign Tenant
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Assign Tenant Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Tenant to Room {selectedRoom?.number}</DialogTitle>
            </DialogHeader>
            {selectedRoom && (
              <form onSubmit={handleSubmitAssignment} className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Room Type:</span>
                      <p className="font-medium">{selectedRoom.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Rent:</span>
                      <p className="font-medium">₱{selectedRoom.monthlyRent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Tenant Name</label>
                  <input
                    type="text"
                    value={assignForm.tenantName}
                    onChange={(e) => setAssignForm({ ...assignForm, tenantName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="Enter tenant name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={assignForm.email}
                    onChange={(e) => setAssignForm({ ...assignForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="tenant@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={assignForm.phone}
                    onChange={(e) => setAssignForm({ ...assignForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    placeholder="+63 XXX XXX XXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Move-in Date</label>
                  <input
                    type="date"
                    value={assignForm.moveInDate}
                    onChange={(e) => setAssignForm({ ...assignForm, moveInDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Assign Tenant
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAssignDialogOpen(false)}
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
