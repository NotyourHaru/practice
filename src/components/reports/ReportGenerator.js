import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock projects
const MOCK_PROJECTS = [
  { id: 1, title: 'Website Redesign', department: 'IT' },
  { id: 2, title: 'Employee Training Program', department: 'HR' },
  { id: 3, title: 'Q2 Marketing Campaign', department: 'Marketing' },
  { id: 4, title: 'Mobile App Development', department: 'IT' }
];

// Mock progress data (for generating reports)
const MOCK_PROGRESS_DATA = [
  // Website Redesign (IT)
  { 
    projectId: 1, 
    timeline: [
      { date: '2024-02-01', progress: 10, milestone: 'Project Start' },
      { date: '2024-02-15', progress: 20, milestone: 'Requirements Finalized' },
      { date: '2024-03-01', progress: 30, milestone: 'Design Phase Complete' },
      { date: '2024-03-15', progress: 45, milestone: 'Frontend Development Started' },
      { date: '2024-04-01', progress: 60, milestone: 'Backend Integration Started' },
      { date: '2024-04-15', progress: 70, milestone: 'Testing Phase Started' },
      { date: '2024-05-01', progress: 75, milestone: 'Current Progress' }
    ],
    contributors: [
      { name: 'David Wilson', role: 'Lead Developer', submissionCount: 12 },
      { name: 'Robert Johnson', role: 'Backend Developer', submissionCount: 8 }
    ],
    issues: [
      { date: '2024-03-10', description: 'Design revisions required for homepage', resolved: true },
      { date: '2024-04-05', description: 'API integration issues with user authentication', resolved: false }
    ]
  },
  
  // Employee Training Program (HR)
  { 
    projectId: 2, 
    timeline: [
      { date: '2024-03-15', progress: 5, milestone: 'Project Start' },
      { date: '2024-03-25', progress: 15, milestone: 'Need Assessment Complete' },
      { date: '2024-04-10', progress: 25, milestone: 'Content Development Started' },
      { date: '2024-04-28', progress: 30, milestone: 'Current Progress' }
    ],
    contributors: [
      { name: 'Emily Brown', role: 'Training Specialist', submissionCount: 5 },
      { name: 'Amanda Miller', role: 'HR Analyst', submissionCount: 3 }
    ],
    issues: [
      { date: '2024-04-15', description: 'Content development delayed due to stakeholder feedback', resolved: true }
    ]
  },
  
  // Q2 Marketing Campaign (Marketing)
  { 
    projectId: 3, 
    timeline: [
      { date: '2024-04-01', progress: 10, milestone: 'Campaign Planning Started' },
      { date: '2024-04-15', progress: 30, milestone: 'Creative Assets Development' },
      { date: '2024-04-25', progress: 40, milestone: 'Social Media Strategy Finalized' },
      { date: '2024-05-01', progress: 45, milestone: 'Campaign Launch' }
    ],
    contributors: [
      { name: 'Jessica Taylor', role: 'Campaign Manager', submissionCount: 6 },
      { name: 'Daniel Thompson', role: 'Social Media Specialist', submissionCount: 4 }
    ],
    issues: []
  },
  
  // Mobile App Development (IT)
  { 
    projectId: 4, 
    timeline: [
      { date: '2024-01-15', progress: 5, milestone: 'Project Start' },
      { date: '2024-02-01', progress: 15, milestone: 'Requirements Gathering' },
      { date: '2024-02-15', progress: 25, milestone: 'UX/UI Design Completion' },
      { date: '2024-03-01', progress: 35, milestone: 'Frontend Development' },
      { date: '2024-03-15', progress: 45, milestone: 'Backend Development Started' },
      { date: '2024-04-01', progress: 55, milestone: 'API Integration' },
      { date: '2024-04-15', progress: 60, milestone: 'Current Progress' }
    ],
    contributors: [
      { name: 'David Wilson', role: 'Mobile Developer', submissionCount: 10 },
      { name: 'Robert Johnson', role: 'Backend Developer', submissionCount: 7 }
    ],
    issues: [
      { date: '2024-03-20', description: 'Performance issues on Android devices', resolved: true },
      { date: '2024-04-10', description: 'API authentication issues', resolved: false }
    ]
  }
];

function ReportPreview({ selectedProject, reportType, dateRange }) {
  // Find project data
  const project = MOCK_PROJECTS.find(p => p.id === selectedProject);
  const projectData = MOCK_PROGRESS_DATA.find(p => p.projectId === selectedProject);
  
  if (!project || !projectData) {
    return <div className="report-preview-empty">Select a project to generate a report.</div>;
  }
  
  // Filter timeline data based on date range if provided
  const filteredTimeline = dateRange.startDate && dateRange.endDate
    ? projectData.timeline.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(dateRange.startDate) && entryDate <= new Date(dateRange.endDate);
      })
    : projectData.timeline;
  
  return (
    <div className="report-preview">
      <div className="report-header">
        <h3>{project.title} - {reportType === 'progress' ? 'Progress Report' : 'Activity Summary'}</h3>
        <p className="report-date">Generated on: {new Date().toLocaleDateString()}</p>
        {dateRange.startDate && dateRange.endDate && (
          <p className="report-period">
            Report Period: {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}
          </p>
        )}
      </div>
      
      {reportType === 'progress' && (
        <>
          <section className="report-section">
            <h4>Progress Timeline</h4>
            <div className="progress-chart">
              {/* Simplified timeline chart for demonstration */}
              <div className="timeline-chart">
                {filteredTimeline.map((entry, index) => (
                  <div key={index} className="timeline-entry" style={{ left: `${index * (100 / (filteredTimeline.length - 1 || 1))}%` }}>
                    <div className="timeline-marker" style={{ backgroundColor: entry.milestone === 'Current Progress' ? 'var(--primary-color)' : '#4285F4' }}></div>
                    <div className="timeline-date">{new Date(entry.date).toLocaleDateString()}</div>
                    <div className="timeline-progress">{entry.progress}%</div>
                    <div className="timeline-milestone">{entry.milestone}</div>
                  </div>
                ))}
                
                {/* Progress line connecting points */}
                <div className="timeline-line"></div>
              </div>
            </div>
          </section>
          
          <section className="report-section">
            <h4>Milestone Breakdown</h4>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Milestone</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimeline.map((entry, index) => (
                  <tr key={index}>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{entry.milestone}</td>
                    <td>{entry.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
      
      {reportType === 'activity' && (
        <>
          <section className="report-section">
            <h4>Team Activity</h4>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Team Member</th>
                  <th>Role</th>
                  <th>Submissions</th>
                </tr>
              </thead>
              <tbody>
                {projectData.contributors.map((contributor, index) => (
                  <tr key={index}>
                    <td>{contributor.name}</td>
                    <td>{contributor.role}</td>
                    <td>{contributor.submissionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          
          <section className="report-section">
            <h4>Issues Tracker</h4>
            {projectData.issues.length > 0 ? (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.issues.map((issue, index) => (
                    <tr key={index}>
                      <td>{new Date(issue.date).toLocaleDateString()}</td>
                      <td>{issue.description}</td>
                      <td>
                        <span className={`status-pill ${issue.resolved ? 'resolved' : 'pending'}`}>
                          {issue.resolved ? 'Resolved' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data-message">No issues reported for this project.</p>
            )}
          </section>
        </>
      )}
      
      <div className="report-footer">
        <p>This report is generated automatically by the Department Monitoring System.</p>
        <p>For inquiries, please contact your department head.</p>
      </div>
    </div>
  );
}

function ReportGenerator({ department }) {
  const [departmentProjects, setDepartmentProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [reportType, setReportType] = useState('progress'); // 'progress' or 'activity'
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    // Filter projects by department
    const projects = MOCK_PROJECTS.filter(project => project.department === department);
    setDepartmentProjects(projects);
  }, [department]);
  
  const handleProjectChange = (e) => {
    setSelectedProject(parseInt(e.target.value));
  };
  
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleExportFormatChange = (e) => {
    setExportFormat(e.target.value);
  };
  
  const handleGenerateReport = () => {
    if (!selectedProject) {
      alert('Please select a project to generate a report.');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulating report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated in ${exportFormat.toUpperCase()} format and ready for download!`);
    }, 1500);
  };
  
  return (
    <div className="report-generator-container">
      <div className="section-header">
        <h2>Report Generator</h2>
      </div>
      
      <div className="report-builder">
        <div className="report-options">
          <div className="form-group">
            <label>Select Project</label>
            <select 
              value={selectedProject} 
              onChange={handleProjectChange}
            >
              <option value="">Choose a project</option>
              {departmentProjects.map(project => (
                <option key={project.id} value={project.id}>{project.title}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Report Type</label>
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="reportType" 
                  value="progress" 
                  checked={reportType === 'progress'} 
                  onChange={handleReportTypeChange}
                />
                Progress Timeline
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="reportType" 
                  value="activity" 
                  checked={reportType === 'activity'} 
                  onChange={handleReportTypeChange}
                />
                Activity Summary
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Date Range (Optional)</label>
            <div className="date-range-inputs">
              <div className="date-input">
                <label>From</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={dateRange.startDate} 
                  onChange={handleDateChange}
                />
              </div>
              <div className="date-input">
                <label>To</label>
                <input 
                  type="date" 
                  name="endDate" 
                  value={dateRange.endDate} 
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Export Format</label>
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="pdf" 
                  checked={exportFormat === 'pdf'} 
                  onChange={handleExportFormatChange}
                />
                PDF Document
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="exportFormat" 
                  value="excel" 
                  checked={exportFormat === 'excel'} 
                  onChange={handleExportFormatChange}
                />
                Excel Spreadsheet
              </label>
            </div>
          </div>
          
          <button 
            className="generate-button"
            onClick={handleGenerateReport}
            disabled={isGenerating || !selectedProject}
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
        
        <div className="report-preview-container">
          <h3 className="preview-title">Report Preview</h3>
          <ReportPreview 
            selectedProject={selectedProject}
            reportType={reportType}
            dateRange={dateRange}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportGenerator; 