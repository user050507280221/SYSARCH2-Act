import { CheckCircle2, Circle, Upload, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const issueTypes = [
  'Plumbing',
  'Electrical',
  'Air Conditioning',
  'Heating',
  'Door/Window',
  'Furniture',
  'Internet/WiFi',
  'Other',
];

const maintenanceHistory = [
  {
    id: 1,
    issue: 'AC not cooling properly',
    type: 'Air Conditioning',
    date: 'Mar 15, 2026',
    status: 'completed' as const,
    assignedTo: 'Carlos Reyes (HVAC Team)',
    steps: [
      { label: 'Request Received', completed: true, date: 'Mar 15, 2026 10:00 AM' },
      { label: 'Technician Assigned', completed: true, date: 'Mar 15, 2026 11:30 AM' },
      { label: 'In Progress', completed: true, date: 'Mar 16, 2026 09:00 AM' },
      { label: 'Completed', completed: true, date: 'Mar 16, 2026 03:30 PM' },
    ],
  },
  {
    id: 2,
    issue: 'Leaking faucet in bathroom',
    type: 'Plumbing',
    date: 'Mar 20, 2026',
    status: 'active' as const,
    assignedTo: 'Miguel Torres (Plumber)',
    steps: [
      { label: 'Request Received', completed: true, date: 'Mar 20, 2026 02:15 PM' },
      { label: 'Technician Assigned', completed: true, date: 'Mar 20, 2026 03:00 PM' },
      { label: 'In Progress', completed: true, date: 'May 3, 2026 08:00 AM' },
      { label: 'Completed', completed: false, date: '' },
    ],
  },
  {
    id: 3,
    issue: 'Window lock broken',
    type: 'Door/Window',
    date: 'May 1, 2026',
    status: 'pending' as const,
    steps: [
      { label: 'Request Received', completed: true, date: 'May 1, 2026 04:00 PM' },
      { label: 'Technician Assigned', completed: false, date: '' },
      { label: 'In Progress', completed: false, date: '' },
      { label: 'Completed', completed: false, date: '' },
    ],
  },
];

export function MaintenanceRequest() {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [photoFileName, setPhotoFileName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Maintenance request submitted successfully!', {
      description: 'We will review your request and assign a technician shortly.',
    });
    setIssueType('');
    setDescription('');
    setPhotoFileName('');
    setShowForm(false);
  };

  const handlePhotoClick = () => {
    setPhotoFileName('maintenance-photo.jpg');
    toast.info('Photo upload simulated');
  };

  const getCompletionPercentage = (steps: any[]) => {
    const completed = steps.filter(s => s.completed).length;
    return (completed / steps.length) * 100;
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl mb-2">Maintenance Requests</h2>
        <p className="text-sm lg:text-base text-muted-foreground">Submit and track repair requests for your room</p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-primary text-white py-4 rounded-xl mb-6 hover:bg-primary/90 transition-all shadow-sm font-medium"
        >
          + New Maintenance Request
        </button>
      ) : (
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
          <h3 className="mb-4 text-lg">Submit New Request</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-2">Issue Type *</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                required
              >
                <option value="">Select issue type...</option>
                {issueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary h-28 resize-none bg-white"
                placeholder="Please describe the issue in detail..."
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Upload Photo (Optional)</label>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-gray-50 transition-all w-full"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <div className="text-left">
                  <span className="text-sm text-gray-700">
                    {photoFileName || 'Take or upload photo'}
                  </span>
                  {photoFileName && (
                    <p className="text-xs text-muted-foreground">Photo attached</p>
                  )}
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setIssueType('');
                  setDescription('');
                  setPhotoFileName('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h3 className="mb-4 text-lg">Request History & Status Tracker</h3>
        <div className="space-y-4">
          {maintenanceHistory.map((request) => {
            const completionPercentage = getCompletionPercentage(request.steps);
            return (
              <div key={request.id} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium mb-1">{request.issue}</p>
                    <p className="text-sm text-muted-foreground">{request.type} • {request.date}</p>
                    {request.assignedTo && (
                      <p className="text-xs text-primary mt-1">Assigned to: {request.assignedTo}</p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${
                      request.status === 'completed'
                        ? 'bg-success/10 text-success border-success/20'
                        : request.status === 'active'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-warning/10 text-warning border-warning/20'
                    }`}
                  >
                    {request.status === 'completed' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : request.status === 'active' ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {request.status === 'completed' ? 'Completed' : request.status === 'active' ? 'In Progress' : 'Pending'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{Math.round(completionPercentage)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Status Tracker Timeline */}
                <div className="relative pl-8 mt-4">
                  {request.steps.map((step, index) => (
                    <div key={index} className="relative pb-6 last:pb-0">
                      {index !== request.steps.length - 1 && (
                        <div
                          className={`absolute left-[7px] top-6 w-0.5 h-full ${
                            step.completed ? 'bg-primary' : 'bg-gray-200'
                          }`}
                        />
                      )}
                      <div className="flex items-start gap-3">
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-primary absolute -left-8" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300 absolute -left-8" />
                        )}
                        <div className="flex-1">
                          <span
                            className={`text-sm ${step.completed ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                          >
                            {step.label}
                          </span>
                          {step.date && (
                            <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}