import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock user data for field monitors
const MOCK_USERS = [
  { id: 1, username: 'it_head', fullName: 'John Smith', department: 'IT', role: 'head' },
  { id: 2, username: 'hr_head', fullName: 'Sarah Johnson', department: 'HR', role: 'head' },
  { id: 3, username: 'marketing_head', fullName: 'Mike Davis', department: 'Marketing', role: 'head' },
  { id: 4, username: 'field_user1', fullName: 'David Wilson', department: 'IT', role: 'field', email: 'david.wilson@example.com', phone: '123-456-7890', active: true },
  { id: 5, username: 'field_user2', fullName: 'Emily Brown', department: 'HR', role: 'field', email: 'emily.brown@example.com', phone: '234-567-8901', active: true },
  { id: 6, username: 'field_user3', fullName: 'Jessica Taylor', department: 'Marketing', role: 'field', email: 'jessica.taylor@example.com', phone: '345-678-9012', active: true },
  { id: 7, username: 'field_user4', fullName: 'Robert Johnson', department: 'IT', role: 'field', email: 'robert.johnson@example.com', phone: '456-789-0123', active: false },
  { id: 8, username: 'field_user5', fullName: 'Amanda Miller', department: 'HR', role: 'field', email: 'amanda.miller@example.com', phone: '567-890-1234', active: true },
  { id: 9, username: 'field_user6', fullName: 'Daniel Thompson', department: 'Marketing', role: 'field', email: 'daniel.thompson@example.com', phone: '678-901-2345', active: true },
];

// Mock projects
const MOCK_PROJECTS = [
  { id: 1, title: 'Website Redesign', department: 'IT' },
  { id: 2, title: 'Employee Training Program', department: 'HR' },
  { id: 3, title: 'Q2 Marketing Campaign', department: 'Marketing' },
  { id: 4, title: 'Mobile App Development', department: 'IT' }
];

// Mock assignments
const MOCK_ASSIGNMENTS = [
  { id: 1, userId: 4, projectId: 1, assignedDate: '2024-04-01', permissions: ['submit_reports', 'upload_images', 'adjust_timeline'], role: 'Lead Developer' },
  { id: 2, userId: 7, projectId: 4, assignedDate: '2024-03-15', permissions: ['submit_reports', 'upload_images'], role: 'Mobile Developer' },
  { id: 3, userId: 5, projectId: 2, assignedDate: '2024-04-10', permissions: ['submit_reports', 'upload_images', 'adjust_timeline'], role: 'Training Specialist' },
  { id: 4, userId: 8, projectId: 2, assignedDate: '2024-04-12', permissions: ['submit_reports'], role: 'HR Analyst' },
  { id: 5, userId: 6, projectId: 3, assignedDate: '2024-04-05', permissions: ['submit_reports', 'upload_images', 'adjust_timeline'], role: 'Campaign Manager' },
  { id: 6, userId: 9, projectId: 3, assignedDate: '2024-04-07', permissions: ['submit_reports', 'upload_images'], role: 'Social Media Specialist' }
];

function FieldMonitorCard({ monitor, assignedProjects, onEdit, onDeactivate, onAssign }) {
  return (
    <div className={`monitor-card ${!monitor.active ? 'inactive' : ''}`}>
      <div className="monitor-header">
        <h3>{monitor.fullName}</h3>
        {!monitor.active && <span className="inactive-badge">Inactive</span>}
      </div>
      <div className="monitor-details">
        <p><strong>Email:</strong> {monitor.email}</p>
        <p><strong>Phone:</strong> {monitor.phone}</p>
        <p><strong>Username:</strong> {monitor.username}</p>
      </div>
      <div className="monitor-projects">
        <h4>Assigned Projects ({assignedProjects.length})</h4>
        {assignedProjects.length > 0 ? (
          <ul className="assigned-projects-list">
            {assignedProjects.map(assignment => {
              const project = MOCK_PROJECTS.find(p => p.id === assignment.projectId);
              return (
                <li key={assignment.id}>
                  <span className="project-name">{project?.title}</span>
                  <span className="assignment-role">{assignment.role}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-assignments">No projects assigned</p>
        )}
      </div>
      <div className="monitor-actions">
        <button 
          className="edit-button" 
          onClick={() => onEdit(monitor.id)}
        >
          Edit User
        </button>
        <button 
          className="assign-button" 
          onClick={() => onAssign(monitor.id)}
        >
          Assign to Project
        </button>
        {monitor.active ? (
          <button 
            className="deactivate-button" 
            onClick={() => onDeactivate(monitor.id, false)}
          >
            Deactivate
          </button>
        ) : (
          <button 
            className="activate-button" 
            onClick={() => onDeactivate(monitor.id, true)}
          >
            Activate
          </button>
        )}
      </div>
    </div>
  );
}

function FieldMonitors({ department }) {
  const [monitors, setMonitors] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  
  // Form state for adding/editing user
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    department: department
  });
  
  // Assignment form state
  const [assignmentData, setAssignmentData] = useState({
    projectId: '',
    role: '',
    permissions: ['submit_reports']
  });

  useEffect(() => {
    // Filter field monitors by department
    const departmentMonitors = MOCK_USERS.filter(
      user => user.department === department && user.role === 'field'
    );
    setMonitors(departmentMonitors);
    
    // Filter assignments for this department's projects
    const departmentProjects = MOCK_PROJECTS.filter(
      project => project.department === department
    ).map(project => project.id);
    
    const departmentAssignments = MOCK_ASSIGNMENTS.filter(
      assignment => departmentProjects.includes(assignment.projectId)
    );
    
    setAssignments(departmentAssignments);
  }, [department]);

  const handleEditMonitor = (monitorId) => {
    const monitor = monitors.find(m => m.id === monitorId);
    if (monitor) {
      setSelectedMonitor(monitor);
      setFormData({
        fullName: monitor.fullName,
        email: monitor.email || '',
        phone: monitor.phone || '',
        username: monitor.username,
        department: monitor.department
      });
      setShowEditModal(true);
    }
  };

  const handleAssignToProject = (monitorId) => {
    setSelectedMonitor(monitors.find(m => m.id === monitorId));
    setAssignmentData({
      projectId: '',
      role: '',
      permissions: ['submit_reports']
    });
    setShowAssignModal(true);
  };

  const handleDeactivateMonitor = (monitorId, activate) => {
    setMonitors(
      monitors.map(monitor => 
        monitor.id === monitorId 
          ? { ...monitor, active: activate } 
          : monitor
      )
    );
  };

  const handleAddNewMonitor = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      username: '',
      department: department
    });
    setShowAddModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setAssignmentData(prev => {
      // If permission is already selected, remove it; otherwise, add it
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      return {
        ...prev,
        permissions: newPermissions
      };
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend API
    if (selectedMonitor) {
      setMonitors(
        monitors.map(monitor => 
          monitor.id === selectedMonitor.id
            ? { ...monitor, ...formData }
            : monitor
        )
      );
    }
    setShowEditModal(false);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend API
    const newMonitor = {
      id: Math.max(...monitors.map(m => m.id)) + 1,
      ...formData,
      role: 'field',
      active: true
    };
    
    setMonitors([...monitors, newMonitor]);
    setShowAddModal(false);
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!assignmentData.projectId || !assignmentData.role) {
      alert('Please select a project and specify a role');
      return;
    }
    
    // In a real app, you would send this to a backend API
    const newAssignment = {
      id: Math.max(...assignments.map(a => a.id), 0) + 1,
      userId: selectedMonitor.id,
      projectId: parseInt(assignmentData.projectId),
      assignedDate: new Date().toISOString().split('T')[0],
      permissions: assignmentData.permissions,
      role: assignmentData.role
    };
    
    setAssignments([...assignments, newAssignment]);
    setShowAssignModal(false);
  };

  // Filter monitors based on search and active status
  const filteredMonitors = monitors.filter(monitor => {
    // Filter by search term
    const matchesSearch = 
      monitor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monitor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (monitor.email && monitor.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by active status
    const matchesStatus = showInactive || monitor.active;
    
    return matchesSearch && matchesStatus;
  });

  // Get assignments for a specific monitor
  const getMonitorAssignments = (monitorId) => {
    return assignments.filter(assignment => assignment.userId === monitorId);
  };

  return (
    <div className="field-monitors-container">
      <div className="section-header">
        <h2>Field Monitors</h2>
        <button 
          className="add-monitor-button"
          onClick={handleAddNewMonitor}
        >
          Add New Monitor
        </button>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            Show Inactive Monitors
          </label>
        </div>
      </div>

      <div className="monitors-grid">
        {filteredMonitors.length > 0 ? (
          filteredMonitors.map(monitor => (
            <FieldMonitorCard
              key={monitor.id}
              monitor={monitor}
              assignedProjects={getMonitorAssignments(monitor.id)}
              onEdit={handleEditMonitor}
              onDeactivate={handleDeactivateMonitor}
              onAssign={handleAssignToProject}
            />
          ))
        ) : (
          <p className="no-data-message">No field monitors found for your department.</p>
        )}
      </div>

      {/* Edit Field Monitor Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Field Monitor</h3>
              <button className="close-button" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="save-button">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Field Monitor Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Field Monitor</h3>
              <button className="close-button" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitAdd}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    disabled
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="save-button">Add Monitor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign to Project Modal */}
      {showAssignModal && selectedMonitor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Assign to Project</h3>
              <button className="close-button" onClick={() => setShowAssignModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitAssignment}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Field Monitor</label>
                  <input
                    type="text"
                    value={selectedMonitor.fullName}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Project</label>
                  <select
                    name="projectId"
                    value={assignmentData.projectId}
                    onChange={handleAssignmentInputChange}
                    required
                  >
                    <option value="">Select a project</option>
                    {MOCK_PROJECTS.filter(project => project.department === department).map(project => (
                      <option key={project.id} value={project.id}>{project.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={assignmentData.role}
                    onChange={handleAssignmentInputChange}
                    placeholder="e.g., Site Engineer, Project Coordinator"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Permissions</label>
                  <div className="permissions-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={assignmentData.permissions.includes('submit_reports')}
                        onChange={() => handlePermissionChange('submit_reports')}
                      />
                      Submit Progress Reports
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={assignmentData.permissions.includes('upload_images')}
                        onChange={() => handlePermissionChange('upload_images')}
                      />
                      Upload Site Images
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={assignmentData.permissions.includes('adjust_timeline')}
                        onChange={() => handlePermissionChange('adjust_timeline')}
                      />
                      Adjust Project Timeline
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={() => setShowAssignModal(false)}>Cancel</button>
                <button type="submit" className="save-button">Assign to Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FieldMonitors; 