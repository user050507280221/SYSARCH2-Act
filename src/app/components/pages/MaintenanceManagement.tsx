import { Wrench, Clock, CheckCircle, AlertCircle, User, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  room: string;
  tenant: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'pending' | 'ongoing' | 'completed';
  dateReported: string;
  assignedTo?: string;
  completedDate?: string;
}

export function MaintenanceManagement() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: '1',
      title: 'AC Unit Not Cooling',
      description: 'The air conditioning unit is running but not cooling the room effectively.',
      room: 'Room 302',
      tenant: 'Angel',
      category: 'HVAC',
      priority: 'High',
      status: 'pending',
      dateReported: '2026-05-01',
    },
    {
      id: '2',
      title: 'Leaking Faucet',
      description: 'Kitchen faucet has been dripping constantly for two days.',
      room: 'Room 215',
      tenant: 'Maria Santos',
      category: 'Plumbing',
      priority: 'Medium',
      status: 'pending',
      dateReported: '2026-04-30',
    },
    {
      id: '3',
      title: 'Broken Door Lock',
      description: 'The main door lock is not securing properly.',
      room: 'Room 408',
      tenant: 'Carlos Reyes',
      category: 'Security',
      priority: 'Urgent',
      status: 'pending',
      dateReported: '2026-05-02',
    },
    {
      id: '4',
      title: 'Light Fixture Repair',
      description: 'Ceiling light in bedroom is flickering.',
      room: 'Room 112',
      tenant: 'Sofia Gonzales',
      category: 'Electrical',
      priority: 'Low',
      status: 'ongoing',
      dateReported: '2026-04-28',
      assignedTo: 'Electrician Team',
    },
    {
      id: '5',
      title: 'Window Glass Replacement',
      description: 'Cracked window glass needs replacement.',
      room: 'Room 521',
      tenant: 'Juan Dela Cruz',
      category: 'Maintenance',
      priority: 'Medium',
      status: 'ongoing',
      dateReported: '2026-04-27',
      assignedTo: 'Maintenance Crew A',
    },
    {
      id: '6',
      title: 'Shower Drain Clog',
      description: 'Shower drain is completely clogged.',
      room: 'Room 304',
      tenant: 'Isabella Cruz',
      category: 'Plumbing',
      priority: 'High',
      status: 'completed',
      dateReported: '2026-04-25',
      assignedTo: 'Plumber Team',
      completedDate: '2026-04-26',
    },
  ]);

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [assignee, setAssignee] = useState('');

  const handleAssignTask = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setAssignee('');
    setIsAssignDialogOpen(true);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask && assignee) {
      setTasks(tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, status: 'ongoing' as const, assignedTo: assignee }
          : task
      ));
      toast.success(`Task assigned to ${assignee}`);
      setIsAssignDialogOpen(false);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const ongoingTasks = tasks.filter(t => t.status === 'ongoing');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-danger/10 text-danger border-danger/20';
      case 'High': return 'bg-warning/10 text-warning border-warning/20';
      case 'Medium': return 'bg-accent/10 text-accent border-accent/20';
      case 'Low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const TaskCard = ({ task }: { task: MaintenanceTask }) => (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium mb-1">{task.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)} whitespace-nowrap ml-2`}>
          {task.priority}
        </span>
      </div>

      <div className="space-y-2 text-sm mb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{task.room}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{task.tenant}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(task.dateReported).toLocaleDateString()}</span>
        </div>
        {task.assignedTo && (
          <div className="flex items-center gap-2 text-primary">
            <Wrench className="w-4 h-4" />
            <span className="font-medium">{task.assignedTo}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 font-medium">
          {task.category}
        </span>
        {task.status === 'pending' && (
          <button
            onClick={() => handleAssignTask(task)}
            className="ml-auto px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-sm"
          >
            Assign
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Maintenance Management</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Manage and assign maintenance tasks across all properties
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl lg:text-3xl font-medium text-warning">{pendingTasks.length}</p>
              </div>
              <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-warning" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ongoing</p>
                <p className="text-2xl lg:text-3xl font-medium text-primary">{ongoingTasks.length}</p>
              </div>
              <Wrench className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl lg:text-3xl font-medium text-success">{completedTasks.length}</p>
              </div>
              <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-success" />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Pending */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-warning/5">
              <h3 className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Pending ({pendingTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {pendingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {pendingTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No pending tasks</p>
              )}
            </div>
          </div>

          {/* Ongoing */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-primary/5">
              <h3 className="text-lg flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Ongoing ({ongoingTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {ongoingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {ongoingTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No ongoing tasks</p>
              )}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 bg-success/5">
              <h3 className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Completed ({completedTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
              {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {completedTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No completed tasks</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Pending */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 bg-warning/5">
              <h3 className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Pending ({pendingTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {pendingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {pendingTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No pending tasks</p>
              )}
            </div>
          </div>

          {/* Ongoing */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 bg-primary/5">
              <h3 className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Ongoing ({ongoingTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {ongoingTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {ongoingTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No ongoing tasks</p>
              )}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 py-3 border-b border-gray-200 bg-success/5">
              <h3 className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Completed ({completedTasks.length})
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
              {completedTasks.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No completed tasks</p>
              )}
            </div>
          </div>
        </div>

        {/* Assign Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Maintenance Task</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <form onSubmit={handleSubmitAssignment} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm mb-2">Task</label>
                  <p className="font-medium">{selectedTask.title}</p>
                  <p className="text-sm text-muted-foreground">{selectedTask.room}</p>
                </div>
                <div>
                  <label className="block text-sm mb-2">Assign To</label>
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    required
                  >
                    <option value="">Select team...</option>
                    <option value="Electrician Team">Electrician Team</option>
                    <option value="Plumber Team">Plumber Team</option>
                    <option value="HVAC Team">HVAC Team</option>
                    <option value="Maintenance Crew A">Maintenance Crew A</option>
                    <option value="Maintenance Crew B">Maintenance Crew B</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Assign Task
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
