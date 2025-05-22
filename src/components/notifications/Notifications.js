import React from 'react';
import * as ReactHooks from 'react';

const { useState, useEffect } = ReactHooks;

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    projectId: 1,
    title: 'Deadline Approaching',
    message: 'The Website Redesign project is due in 30 days. Current progress is at 75%.',
    type: 'deadline',
    date: '2024-05-01',
    read: false,
    department: 'IT',
    priority: 'medium'
  },
  {
    id: 2,
    projectId: 4,
    title: 'Update Delay',
    message: 'No updates have been submitted for Mobile App Development project in the last 7 days.',
    type: 'delay',
    date: '2024-04-30',
    read: false,
    department: 'IT',
    priority: 'high'
  },
  {
    id: 3,
    projectId: 1,
    title: 'Timeline Adjustment Approved',
    message: 'The timeline adjustment for the Website Redesign project has been approved by John Smith.',
    type: 'approval',
    date: '2024-04-29',
    read: true,
    department: 'IT',
    priority: 'low'
  },
  {
    id: 4,
    projectId: 2,
    title: 'New Submission',
    message: 'Emily Brown has submitted a new progress report for the Employee Training Program.',
    type: 'submission',
    date: '2024-04-28',
    read: false,
    department: 'HR',
    priority: 'medium'
  },
  {
    id: 5,
    projectId: 3,
    title: 'Campaign Performance Alert',
    message: 'Q2 Marketing Campaign is showing lower than expected engagement metrics. Review needed.',
    type: 'alert',
    date: '2024-05-02',
    read: false,
    department: 'Marketing',
    priority: 'high'
  },
  {
    id: 6,
    projectId: 3,
    title: 'New Team Member',
    message: 'Daniel Thompson has been assigned to the Q2 Marketing Campaign as a Social Media Specialist.',
    type: 'team',
    date: '2024-04-25',
    read: true,
    department: 'Marketing',
    priority: 'low'
  },
  {
    id: 7,
    projectId: 4,
    title: 'API Integration Issue',
    message: 'Robert Johnson reported an issue with API authentication in the Mobile App Development project.',
    type: 'alert',
    date: '2024-04-27',
    read: true,
    department: 'IT',
    priority: 'high'
  }
];

// Mock projects for reference
const MOCK_PROJECTS = [
  { id: 1, title: 'Website Redesign', department: 'IT' },
  { id: 2, title: 'Employee Training Program', department: 'HR' },
  { id: 3, title: 'Q2 Marketing Campaign', department: 'Marketing' },
  { id: 4, title: 'Mobile App Development', department: 'IT' }
];

function NotificationIcon({ type }) {
  switch (type) {
    case 'deadline':
      return <span className="notification-icon deadline">⏱️</span>;
    case 'delay':
      return <span className="notification-icon delay">⚠️</span>;
    case 'approval':
      return <span className="notification-icon approval">✅</span>;
    case 'submission':
      return <span className="notification-icon submission">📄</span>;
    case 'alert':
      return <span className="notification-icon alert">🔔</span>;
    case 'team':
      return <span className="notification-icon team">👥</span>;
    default:
      return <span className="notification-icon">📌</span>;
  }
}

function PriorityBadge({ priority }) {
  return (
    <span className={`priority-badge ${priority}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  const project = MOCK_PROJECTS.find(p => p.id === notification.projectId);
  
  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <div className="notification-content">
        <div className="notification-header">
          <NotificationIcon type={notification.type} />
          <h3 className="notification-title">{notification.title}</h3>
          <PriorityBadge priority={notification.priority} />
        </div>
        
        <p className="notification-message">{notification.message}</p>
        
        <div className="notification-details">
          <span className="notification-project">
            {project ? project.title : 'Unknown Project'}
          </span>
          <span className="notification-date">
            {new Date(notification.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="notification-actions">
        {!notification.read && (
          <button 
            className="mark-read-button"
            onClick={() => onMarkAsRead(notification.id)}
            title="Mark as read"
          >
            <span>✓</span>
          </button>
        )}
        <button 
          className="delete-button"
          onClick={() => onDelete(notification.id)}
          title="Delete notification"
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
}

function EmptyNotifications() {
  return (
    <div className="empty-notifications">
      <div className="empty-icon">🔔</div>
      <h3>No Notifications</h3>
      <p>You're all caught up! No new notifications to display.</p>
    </div>
  );
}

function Notifications({ department, onRead }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  useEffect(() => {
    // Filter notifications by department
    const departmentNotifications = MOCK_NOTIFICATIONS.filter(
      notification => notification.department === department
    );
    setNotifications(departmentNotifications);
    
    // Call onRead prop to update unread count in parent component
    const unreadCount = departmentNotifications.filter(n => !n.read).length;
    if (onRead) {
      onRead(unreadCount);
    }
  }, [department, onRead]);
  
  const handleMarkAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    
    // Update unread count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    if (onRead) {
      onRead(unreadCount);
    }
  };
  
  const handleDelete = (notificationId) => {
    const updatedNotifications = notifications.filter(notification => 
      notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
    
    // Update unread count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    if (onRead) {
      onRead(unreadCount);
    }
  };
  
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    
    // Update unread count to zero
    if (onRead) {
      onRead(0);
    }
  };
  
  // Apply filters
  const filteredNotifications = notifications
    .filter(notification => {
      // Read/unread filter
      if (filter === 'unread' && notification.read) return false;
      if (filter === 'read' && !notification.read) return false;
      
      // Type filter
      if (typeFilter !== 'all' && notification.type !== typeFilter) return false;
      
      // Priority filter
      if (priorityFilter !== 'all' && notification.priority !== priorityFilter) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date (newest first) and then by priority
      const dateComparison = new Date(b.date) - new Date(a.date);
      if (dateComparison !== 0) return dateComparison;
      
      // Priority order: high > medium > low
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="notifications-container">
      <div className="section-header">
        <h2>Notifications</h2>
        {unreadCount > 0 && (
          <span className="badge">{unreadCount} Unread</span>
        )}
      </div>
      
      <div className="notifications-controls">
        <div className="filters-bar">
          <div className="filter-group">
            <label>Status:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Type:</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="deadline">Deadlines</option>
              <option value="delay">Delays</option>
              <option value="approval">Approvals</option>
              <option value="submission">Submissions</option>
              <option value="alert">Alerts</option>
              <option value="team">Team Updates</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Priority:</label>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button 
            className="mark-all-read-button"
            onClick={handleMarkAllAsRead}
          >
            Mark All as Read
          </button>
        )}
      </div>
      
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <EmptyNotifications />
        )}
      </div>
      
      <div className="notifications-help">
        <h4>About Notifications</h4>
        <p>
          Notifications alert you about important project events such as upcoming deadlines, 
          submission delays, and team updates. High priority notifications require immediate attention.
        </p>
      </div>
    </div>
  );
}

export default Notifications; 