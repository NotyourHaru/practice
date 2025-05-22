import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock project data - in a real app, this would come from a backend
const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Website Redesign',
    location: 'Head Office',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    progress: 75,
    status: 'On Track',
    department: 'IT',
    lastUpdated: '2024-05-01'
  },
  {
    id: 2,
    title: 'Employee Training Program',
    location: 'Training Center',
    startDate: '2024-03-15',
    endDate: '2024-06-15',
    progress: 30,
    status: 'Delayed',
    department: 'HR',
    lastUpdated: '2024-04-28'
  },
  {
    id: 3,
    title: 'Q2 Marketing Campaign',
    location: 'Marketing Office',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 45,
    status: 'On Track',
    department: 'Marketing',
    lastUpdated: '2024-05-02'
  },
  {
    id: 4,
    title: 'Mobile App Development',
    location: 'Tech Hub',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    progress: 60,
    status: 'On Track',
    department: 'IT',
    lastUpdated: '2024-04-29'
  }
];

function ProjectCard({ project, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'on track':
        return 'var(--success-color)';
      case 'delayed':
        return 'var(--danger-color)';
      case 'completed':
        return 'var(--primary-color)';
      default:
        return '#757575';
    }
  };

  return (
    <div className="project-card">
      <h2 className="project-title">{project.title}</h2>
      <div className="project-details">
        <p><strong>Location:</strong> {project.location}</p>
        <p><strong>Timeline:</strong> {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</p>
        <p><strong>Last Updated:</strong> {new Date(project.lastUpdated).toLocaleDateString()}</p>
      </div>
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{project.progress}% Complete</span>
      </div>
      <div className="project-card-footer">
        <div 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(project.status) }}
        >
          {project.status}
        </div>
        <button 
          className="view-details-button"
          onClick={() => onViewDetails(project.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function ProjectList({ department }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Filter projects by department
    const departmentProjects = MOCK_PROJECTS.filter(
      project => project.department === department
    );
    setProjects(departmentProjects);
  }, [department]);

  const handleViewDetails = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container">
      <div className="section-header">
        <h2>Active & Pending Projects</h2>
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className={`projects-${viewMode}`}>
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <p className="no-data-message">No projects assigned to your department.</p>
        )}
      </div>

      {selectedProject && (
        <div className="project-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedProject.title}</h3>
              <button className="close-button" onClick={handleCloseDetails}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-label">Location:</div>
                <div className="detail-value">{selectedProject.location}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Department:</div>
                <div className="detail-value">{selectedProject.department}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Start Date:</div>
                <div className="detail-value">{new Date(selectedProject.startDate).toLocaleDateString()}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">End Date:</div>
                <div className="detail-value">{new Date(selectedProject.endDate).toLocaleDateString()}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Status:</div>
                <div className="detail-value">
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: selectedProject.status.toLowerCase() === 'on track' 
                        ? 'var(--success-color)' 
                        : selectedProject.status.toLowerCase() === 'delayed'
                          ? 'var(--danger-color)'
                          : 'var(--primary-color)'
                    }}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Progress:</div>
                <div className="detail-value">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{selectedProject.progress}% Complete</span>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-button">View Progress Reports</button>
              <button className="modal-button">View Team Members</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList; 