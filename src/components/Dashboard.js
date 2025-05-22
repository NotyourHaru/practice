import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as ReactHooks from 'react';
import ProjectList from './projects/ProjectList';
import ProgressReports from './progress/ProgressReports';
import FieldMonitors from './team/FieldMonitors';
import UpdateValidation from './validation/UpdateValidation';
import ReportGenerator from './reports/ReportGenerator';
import Notifications from './notifications/Notifications';

const { useState, useEffect } = ReactHooks;

// Mock user data
const MOCK_USERS = [
  { id: 1, username: 'it_head', fullName: 'John Smith', department: 'IT', role: 'head' },
  { id: 2, username: 'hr_head', fullName: 'Sarah Johnson', department: 'HR', role: 'head' },
  { id: 3, username: 'marketing_head', fullName: 'Mike Davis', department: 'Marketing', role: 'head' },
  { id: 4, username: 'field_user1', fullName: 'David Wilson', department: 'IT', role: 'field' },
  { id: 5, username: 'field_user2', fullName: 'Emily Brown', department: 'HR', role: 'field' },
  { id: 6, username: 'field_user3', fullName: 'Jessica Taylor', department: 'Marketing', role: 'field' },
];

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    // Find additional user info from mock data
    const fullUserData = MOCK_USERS.find(u => u.username === userData.username) || userData;
    setUser(fullUserData);
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>{user.department} Department</h1>
          <p className="department-text">Welcome, {user.fullName || user.username}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Sign Out
        </button>
      </header>
      
      <div className="dashboard-navigation">
        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => handleTabChange('projects')}
          >
            Projects
          </button>
          <button
            className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => handleTabChange('progress')}
          >
            Progress Reports
          </button>
          <button
            className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => handleTabChange('team')}
          >
            Field Monitors
          </button>
          <button
            className={`tab-button ${activeTab === 'validation' ? 'active' : ''}`}
            onClick={() => handleTabChange('validation')}
          >
            Update Validation
          </button>
          <button
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabChange('reports')}
          >
            Reports
          </button>
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => handleTabChange('notifications')}
          >
            Notifications
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span>
            )}
          </button>
        </nav>
      </div>
      
      <main className="dashboard-content">
        {activeTab === 'projects' && <ProjectList department={user.department} />}
        {activeTab === 'progress' && <ProgressReports department={user.department} />}
        {activeTab === 'team' && <FieldMonitors department={user.department} />}
        {activeTab === 'validation' && <UpdateValidation department={user.department} />}
        {activeTab === 'reports' && <ReportGenerator department={user.department} />}
        {activeTab === 'notifications' && (
          <Notifications 
            department={user.department} 
            onRead={() => setUnreadNotifications(0)} 
          />
        )}
      </main>
    </div>
  );
}

export default Dashboard; 