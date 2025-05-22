import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock progress report data
const MOCK_PROGRESS_REPORTS = [
  {
    id: 1,
    projectId: 1,
    title: 'Weekly Update - Frontend Development',
    submittedBy: 'David Wilson',
    submittedOn: '2024-05-01',
    status: 'approved',
    details: 'Completed the landing page redesign and started working on the dashboard components. On track to meet the sprint deadline.',
    attachments: ['site_photo_1.jpg', 'design_mockup.pdf'],
    department: 'IT',
    progress: 75
  },
  {
    id: 2,
    projectId: 1,
    title: 'Backend API Integration Update',
    submittedBy: 'David Wilson',
    submittedOn: '2024-04-25',
    status: 'approved',
    details: 'Integrated the authentication API and implemented the user profile endpoints. Currently working on data validation.',
    attachments: ['api_docs.pdf'],
    department: 'IT',
    progress: 68
  },
  {
    id: 3,
    projectId: 2,
    title: 'Training Materials Development',
    submittedBy: 'Emily Brown',
    submittedOn: '2024-04-28',
    status: 'pending',
    details: 'Completed the first draft of training materials for the customer service module. Need approval before proceeding to final version.',
    attachments: ['training_materials_draft.docx', 'feedback_form.pdf'],
    department: 'HR',
    progress: 30
  },
  {
    id: 4,
    projectId: 3,
    title: 'Social Media Campaign Analytics',
    submittedBy: 'Jessica Taylor',
    submittedOn: '2024-05-02',
    status: 'pending',
    details: 'First week of social media campaign completed. Engagement metrics are above target, but conversion rate is below expectations.',
    attachments: ['analytics_report.xlsx', 'campaign_assets.zip'],
    department: 'Marketing',
    progress: 45
  },
  {
    id: 5,
    projectId: 4,
    title: 'Mobile App - Sprint 3 Update',
    submittedBy: 'David Wilson',
    submittedOn: '2024-04-29',
    status: 'rejected',
    details: 'Implemented user profile and notification features. UI testing revealed issues with the notification center on Android devices.',
    attachments: ['test_results.pdf', 'bug_report.docx'],
    department: 'IT',
    progress: 60,
    feedback: 'Please fix the Android notification issues before resubmitting. Also include information about the iOS testing results.'
  }
];

// Mock projects for reference
const MOCK_PROJECTS = [
  { id: 1, title: 'Website Redesign', department: 'IT' },
  { id: 2, title: 'Employee Training Program', department: 'HR' },
  { id: 3, title: 'Q2 Marketing Campaign', department: 'Marketing' },
  { id: 4, title: 'Mobile App Development', department: 'IT' }
];

function ProgressReportCard({ report, onAction, onViewDetails }) {
  const getStatusBadge = (status) => {
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
    
    return (
      <span className="status-badge" style={{ backgroundColor: color }}>
        {text}
      </span>
    );
  };
  
  // Find the project title
  const project = MOCK_PROJECTS.find(p => p.id === report.projectId);
  
  return (
    <div className="report-card">
      <div className="report-header">
        <h3>{report.title}</h3>
        {getStatusBadge(report.status)}
      </div>
      <div className="report-details">
        <p><strong>Project:</strong> {project ? project.title : 'Unknown Project'}</p>
        <p><strong>Submitted By:</strong> {report.submittedBy}</p>
        <p><strong>Submitted On:</strong> {new Date(report.submittedOn).toLocaleDateString()}</p>
        <p><strong>Reported Progress:</strong> {report.progress}%</p>
      </div>
      <div className="report-actions">
        <button 
          className="view-details-button"
          onClick={() => onViewDetails(report.id)}
        >
          View Details
        </button>
        {report.status === 'pending' && (
          <div className="approval-buttons">
            <button 
              className="approve-button"
              onClick={() => onAction(report.id, 'approve')}
            >
              Approve
            </button>
            <button 
              className="reject-button"
              onClick={() => onAction(report.id, 'reject')}
            >
              Reject
            </button>
          </div>
        )}
      </div>
      {report.status === 'rejected' && report.feedback && (
        <div className="feedback-box">
          <p><strong>Feedback:</strong> {report.feedback}</p>
        </div>
      )}
    </div>
  );
}

function ProgressReportDetails({ report, onClose }) {
  const project = MOCK_PROJECTS.find(p => p.id === report.projectId);
  
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3>{report.title}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="modal-body">
        <div className="detail-row">
          <div className="detail-label">Project:</div>
          <div className="detail-value">{project ? project.title : 'Unknown Project'}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Submitted By:</div>
          <div className="detail-value">{report.submittedBy}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Submitted On:</div>
          <div className="detail-value">{new Date(report.submittedOn).toLocaleDateString()}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Status:</div>
          <div className="detail-value">
            <span 
              className="status-badge"
              style={{ 
                backgroundColor: 
                  report.status === 'approved' ? 'var(--success-color)' :
                  report.status === 'rejected' ? 'var(--danger-color)' :
                  'var(--warning-color)'
              }}
            >
              {report.status === 'approved' ? 'Approved' : 
               report.status === 'rejected' ? 'Rejected' : 'Pending Review'}
            </span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Progress Report:</div>
          <div className="detail-value full-width">{report.details}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Reported Progress:</div>
          <div className="detail-value">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${report.progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{report.progress}% Complete</span>
          </div>
        </div>
        {report.attachments && report.attachments.length > 0 && (
          <div className="detail-row">
            <div className="detail-label">Attachments:</div>
            <div className="detail-value attachments-list">
              {report.attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  <span className="attachment-icon">📎</span>
                  <span className="attachment-name">{attachment}</span>
                  <button className="attachment-button">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {report.status === 'rejected' && report.feedback && (
          <div className="detail-row feedback-section">
            <div className="detail-label">Feedback:</div>
            <div className="detail-value feedback-text">{report.feedback}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressReports({ department }) {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [sortBy, setSortBy] = useState('date'); // date, project
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [reportIdForFeedback, setReportIdForFeedback] = useState(null);

  useEffect(() => {
    // Filter reports by department
    const departmentReports = MOCK_PROGRESS_REPORTS.filter(
      report => report.department === department
    );
    setReports(departmentReports);
  }, [department]);

  const handleViewDetails = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
  };

  const handleCloseDetails = () => {
    setSelectedReport(null);
  };

  const handleReportAction = (reportId, action) => {
    if (action === 'approve') {
      // Approve the report immediately
      const updatedReports = reports.map(report => 
        report.id === reportId ? { ...report, status: 'approved' } : report
      );
      setReports(updatedReports);
    } else if (action === 'reject') {
      // Show feedback modal for rejection
      setReportIdForFeedback(reportId);
      setShowFeedbackModal(true);
    }
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      alert('Please provide feedback for the rejection.');
      return;
    }

    // Update the report with rejection feedback
    const updatedReports = reports.map(report => 
      report.id === reportIdForFeedback ? 
        { ...report, status: 'rejected', feedback: feedbackText } : report
    );
    
    setReports(updatedReports);
    setShowFeedbackModal(false);
    setFeedbackText('');
    setReportIdForFeedback(null);
  };

  // Apply filters and sorting
  const filteredReports = reports
    .filter(report => {
      // Status filter
      if (filter !== 'all' && report.status !== filter) return false;
      
      // Search term filter (search in title and details)
      if (searchTerm && !report.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !report.details.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.submittedOn) - new Date(a.submittedOn); // Newest first
      } else if (sortBy === 'project') {
        return a.projectId - b.projectId; // Sort by project ID
      }
      return 0;
    });

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="progress-reports-container">
      <div className="section-header">
        <h2>Progress Reports</h2>
        <span className="badge">{pendingCount > 0 ? `${pendingCount} Pending` : 'No Pending Reports'}</span>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Reports</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Submission Date</option>
              <option value="project">Project</option>
            </select>
          </div>
        </div>
      </div>

      <div className="reports-grid">
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <ProgressReportCard
              key={report.id}
              report={report}
              onAction={handleReportAction}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <p className="no-data-message">No progress reports match your criteria.</p>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="project-details-modal">
          <ProgressReportDetails 
            report={selectedReport} 
            onClose={handleCloseDetails} 
          />
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="feedback-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Provide Feedback</h3>
              <button className="close-button" onClick={() => setShowFeedbackModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Please provide feedback explaining why this report is being rejected:</p>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Enter your feedback here..."
                rows={5}
                required
              />
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowFeedbackModal(false)}>Cancel</button>
              <button className="submit-button" onClick={handleSubmitFeedback}>Submit Feedback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressReports; 