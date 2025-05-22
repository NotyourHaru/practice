import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock updates
const MOCK_UPDATES = [
  {
    id: 1,
    projectId: 1,
    userId: 4,
    title: 'Frontend Framework Implementation',
    submittedOn: '2024-05-02',
    type: 'progress_update',
    content: 'Implemented React components for the dashboard. All core functionality is working as expected. Moving to styling next.',
    status: 'pending',
    department: 'IT',
    attachments: ['component_structure.pdf', 'screenshot1.jpg']
  },
  {
    id: 2,
    projectId: 1,
    userId: 4,
    title: 'UI Design Completion',
    submittedOn: '2024-04-29',
    type: 'timeline_adjustment',
    content: 'UI Design phase is complete. Requesting adjustment to timeline: Development phase can start 2 days earlier than planned.',
    status: 'approved',
    department: 'IT',
    timeline: {
      original: { phase: 'Development', startDate: '2024-05-05' },
      proposed: { phase: 'Development', startDate: '2024-05-03' }
    }
  },
  {
    id: 3,
    projectId: 2,
    userId: 5,
    title: 'Training Materials Review',
    submittedOn: '2024-04-28',
    type: 'progress_update',
    content: 'First draft of training materials completed for customer service module. Ready for review.',
    status: 'pending',
    department: 'HR',
    attachments: ['training_materials_draft.docx']
  },
  {
    id: 4,
    projectId: 3,
    userId: 6,
    title: 'Social Media Campaign Launch',
    submittedOn: '2024-05-01',
    type: 'image_upload',
    content: 'Campaign launched on all platforms. Uploaded images of the first post and initial analytics.',
    status: 'pending',
    department: 'Marketing',
    attachments: ['campaign_post1.jpg', 'analytics_day1.pdf']
  },
  {
    id: 5,
    projectId: 4,
    userId: 7,
    title: 'Mobile App Backend Integration',
    submittedOn: '2024-04-27',
    type: 'progress_update',
    content: 'Backend integration is 70% complete. Encountered issues with API authentication that are delaying progress.',
    status: 'rejected',
    department: 'IT',
    feedback: 'Please provide more details about the API authentication issues and how they impact the timeline.'
  }
];

// Mock projects
const MOCK_PROJECTS = [
  { id: 1, title: 'Website Redesign', department: 'IT' },
  { id: 2, title: 'Employee Training Program', department: 'HR' },
  { id: 3, title: 'Q2 Marketing Campaign', department: 'Marketing' },
  { id: 4, title: 'Mobile App Development', department: 'IT' }
];

// Mock users
const MOCK_USERS = [
  { id: 4, fullName: 'David Wilson', department: 'IT' },
  { id: 5, fullName: 'Emily Brown', department: 'HR' },
  { id: 6, fullName: 'Jessica Taylor', department: 'Marketing' },
  { id: 7, fullName: 'Robert Johnson', department: 'IT' }
];

function getUpdateTypeBadge(type) {
  let color, text, icon;
  
  switch(type) {
    case 'progress_update':
      color = '#4285F4';
      text = 'Progress Update';
      icon = '📊';
      break;
    case 'image_upload':
      color = '#34A853';
      text = 'Image Upload';
      icon = '📷';
      break;
    case 'timeline_adjustment':
      color = '#FBBC05';
      text = 'Timeline Adjustment';
      icon = '📅';
      break;
    default:
      color = '#757575';
      text = 'Update';
      icon = '📝';
  }
  
  return { color, text, icon };
}

function getStatusBadge(status) {
  let color, text;
  
  switch(status) {
    case 'approved':
      color = 'var(--success-color)';
      text = 'Approved';
      break;
    case 'rejected':
      color = 'var(--danger-color)';
      text = 'Rejected';
      break;
    case 'pending':
      color = 'var(--warning-color)';
      text = 'Pending Review';
      break;
    default:
      color = '#757575';
      text = 'Unknown';
  }
  
  return { color, text };
}

function UpdateCard({ update, onView, onApprove, onReject }) {
  const project = MOCK_PROJECTS.find(p => p.id === update.projectId);
  const user = MOCK_USERS.find(u => u.id === update.userId);
  const typeBadge = getUpdateTypeBadge(update.type);
  const statusBadge = getStatusBadge(update.status);

  return (
    <div className="update-card">
      <div className="update-header">
        <div className="update-type-badge" style={{ backgroundColor: typeBadge.color }}>
          <span className="badge-icon">{typeBadge.icon}</span>
          <span>{typeBadge.text}</span>
        </div>
        <div className="status-badge" style={{ backgroundColor: statusBadge.color }}>
          {statusBadge.text}
        </div>
      </div>
      
      <h3 className="update-title">{update.title}</h3>
      
      <div className="update-details">
        <p><strong>Project:</strong> {project?.title || 'Unknown Project'}</p>
        <p><strong>Submitted By:</strong> {user?.fullName || 'Unknown User'}</p>
        <p><strong>Submitted On:</strong> {new Date(update.submittedOn).toLocaleDateString()}</p>
      </div>
      
      <div className="update-preview">
        <p>{update.content.length > 120 ? `${update.content.substring(0, 120)}...` : update.content}</p>
      </div>
      
      {update.attachments && update.attachments.length > 0 && (
        <div className="attachment-count">
          📎 {update.attachments.length} attachment{update.attachments.length !== 1 ? 's' : ''}
        </div>
      )}
      
      {update.timeline && (
        <div className="timeline-adjustment">
          <p>
            <strong>Timeline Change:</strong> {update.timeline.original.phase} start date moved from {new Date(update.timeline.original.startDate).toLocaleDateString()} to {new Date(update.timeline.proposed.startDate).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {update.status === 'rejected' && update.feedback && (
        <div className="feedback-box">
          <p><strong>Feedback:</strong> {update.feedback}</p>
        </div>
      )}
      
      <div className="update-actions">
        <button 
          className="view-button"
          onClick={() => onView(update.id)}
        >
          View Details
        </button>
        
        {update.status === 'pending' && (
          <div className="approval-buttons">
            <button 
              className="approve-button"
              onClick={() => onApprove(update.id)}
            >
              Approve
            </button>
            <button 
              className="reject-button"
              onClick={() => onReject(update.id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UpdateDetailModal({ update, onClose, onApprove, onReject, onSubmitFeedback }) {
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  const project = MOCK_PROJECTS.find(p => p.id === update.projectId);
  const user = MOCK_USERS.find(u => u.id === update.userId);
  const typeBadge = getUpdateTypeBadge(update.type);
  const statusBadge = getStatusBadge(update.status);
  
  const handleReject = () => {
    setShowFeedbackForm(true);
  };
  
  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      alert('Please provide feedback for rejection');
      return;
    }
    
    onSubmitFeedback(update.id, feedback);
    setShowFeedbackForm(false);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content update-detail-modal">
        <div className="modal-header">
          <div className="header-main">
            <div className="update-type-badge" style={{ backgroundColor: typeBadge.color }}>
              <span className="badge-icon">{typeBadge.icon}</span>
              <span>{typeBadge.text}</span>
            </div>
            <h3>{update.title}</h3>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="detail-row">
            <div className="detail-label">Status:</div>
            <div className="detail-value">
              <span className="status-badge" style={{ backgroundColor: statusBadge.color }}>
                {statusBadge.text}
              </span>
            </div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Project:</div>
            <div className="detail-value">{project?.title || 'Unknown Project'}</div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Submitted By:</div>
            <div className="detail-value">{user?.fullName || 'Unknown User'}</div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Submitted On:</div>
            <div className="detail-value">{new Date(update.submittedOn).toLocaleDateString()}</div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Content:</div>
            <div className="detail-value full-width">
              <div className="update-content">{update.content}</div>
            </div>
          </div>
          
          {update.timeline && (
            <div className="detail-row">
              <div className="detail-label">Timeline Adjustment:</div>
              <div className="detail-value">
                <table className="timeline-table">
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Original Date</th>
                      <th>Proposed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{update.timeline.original.phase}</td>
                      <td>{new Date(update.timeline.original.startDate).toLocaleDateString()}</td>
                      <td>{new Date(update.timeline.proposed.startDate).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {update.attachments && update.attachments.length > 0 && (
            <div className="detail-row">
              <div className="detail-label">Attachments:</div>
              <div className="detail-value">
                <div className="attachments-list">
                  {update.attachments.map((attachment, index) => (
                    <div key={index} className="attachment-item">
                      <span className="attachment-icon">
                        {attachment.endsWith('.jpg') || attachment.endsWith('.png') ? '🖼️' : 
                         attachment.endsWith('.pdf') ? '📄' : 
                         attachment.endsWith('.docx') || attachment.endsWith('.doc') ? '📝' : '📎'}
                      </span>
                      <span className="attachment-name">{attachment}</span>
                      <button className="download-button">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {update.status === 'rejected' && update.feedback && (
            <div className="detail-row feedback-section">
              <div className="detail-label">Feedback:</div>
              <div className="detail-value feedback-text">{update.feedback}</div>
            </div>
          )}
          
          {showFeedbackForm && (
            <div className="feedback-form">
              <h4>Provide Feedback for Rejection</h4>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Explain why this update is being rejected..."
                rows={4}
              />
              <div className="feedback-actions">
                <button onClick={() => setShowFeedbackForm(false)}>Cancel</button>
                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
              </div>
            </div>
          )}
        </div>
        
        {update.status === 'pending' && !showFeedbackForm && (
          <div className="modal-footer">
            <button className="approve-button" onClick={() => onApprove(update.id)}>Approve Update</button>
            <button className="reject-button" onClick={handleReject}>Reject Update</button>
          </div>
        )}
      </div>
    </div>
  );
}

function UpdateValidation({ department }) {
  const [updates, setUpdates] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Filter updates by department
    const departmentUpdates = MOCK_UPDATES.filter(
      update => update.department === department
    );
    setUpdates(departmentUpdates);
  }, [department]);
  
  const handleViewUpdate = (updateId) => {
    setSelectedUpdate(updates.find(update => update.id === updateId));
  };
  
  const handleCloseDetail = () => {
    setSelectedUpdate(null);
  };
  
  const handleApprove = (updateId) => {
    const updatedList = updates.map(update => 
      update.id === updateId ? { ...update, status: 'approved' } : update
    );
    setUpdates(updatedList);
    
    if (selectedUpdate && selectedUpdate.id === updateId) {
      setSelectedUpdate({ ...selectedUpdate, status: 'approved' });
    }
  };
  
  const handleReject = (updateId, feedback) => {
    const updatedList = updates.map(update => 
      update.id === updateId ? { ...update, status: 'rejected', feedback } : update
    );
    setUpdates(updatedList);
    
    if (selectedUpdate && selectedUpdate.id === updateId) {
      setSelectedUpdate({ ...selectedUpdate, status: 'rejected', feedback });
    }
  };
  
  // Apply filters
  const filteredUpdates = updates
    .filter(update => {
      // Status filter
      if (filter !== 'all' && update.status !== filter) return false;
      
      // Type filter
      if (typeFilter !== 'all' && update.type !== typeFilter) return false;
      
      // Search term (title and content)
      if (searchTerm && !update.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !update.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(b.submittedOn) - new Date(a.submittedOn)); // Sort by date, newest first
  
  const pendingCount = updates.filter(u => u.status === 'pending').length;
  
  return (
    <div className="update-validation-container">
      <div className="section-header">
        <h2>Update Validation</h2>
        <span className="badge">{pendingCount > 0 ? `${pendingCount} Pending` : 'No Pending Updates'}</span>
      </div>
      
      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search updates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Updates</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Type:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="progress_update">Progress Updates</option>
              <option value="image_upload">Image Uploads</option>
              <option value="timeline_adjustment">Timeline Adjustments</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="updates-grid">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map(update => (
            <UpdateCard
              key={update.id}
              update={update}
              onView={handleViewUpdate}
              onApprove={handleApprove}
              onReject={() => handleViewUpdate(update.id)} // Open the modal to provide feedback
            />
          ))
        ) : (
          <p className="no-data-message">No updates match your criteria.</p>
        )}
      </div>
      
      {selectedUpdate && (
        <UpdateDetailModal
          update={selectedUpdate}
          onClose={handleCloseDetail}
          onApprove={handleApprove}
          onReject={handleReject}
          onSubmitFeedback={handleReject}
        />
      )}
    </div>
  );
}

export default UpdateValidation; 