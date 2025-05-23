# Department Monitoring Dashboard

A comprehensive dashboard for department heads to monitor projects, validate updates, manage field monitors, and generate reports.

## Features

### 1. Authentication
- Login system for department heads
- Registration page for new users
- Secure credential storage

### 2. Project Monitoring
- View active and pending projects
- Track project progress with visual indicators
- View project details and timelines

### 3. Progress Reports
- View and approve progress reports submitted by field monitors
- Filter reports by status, date, and other criteria
- Provide feedback on rejected reports

### 4. Field Monitor Management
- Assign personnel to specific projects
- Manage permissions for field monitors
- Add new monitors or deactivate existing ones

### 5. Update Validation
- Review and approve/reject updates from field personnel
- Validate progress updates, image uploads, and timeline adjustments
- Provide feedback on rejections

### 6. Report Generation
- Generate progress timeline reports
- Create activity summary reports
- Export reports in PDF or Excel format

### 7. Notifications
- Real-time alerts for missed deadlines, delays, and approvals
- Prioritized notification system
- Track and manage notifications

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/department-monitoring-dashboard.git
```

2. Navigate to the project directory
```
cd department-monitoring-dashboard
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Demo Login Credentials

You can use the following credentials to test the application:

| Username | Password | Department |
|----------|----------|------------|
| it_head | password321 | IT |
| hr_head | password321 | HR |
| marketing_head | password321 | Marketing |

## Technologies Used

- React.js
- React Router
- CSS (with custom variables for theming)
- Local Storage (for demo data persistence)

## Project Structure

```
department-monitoring-dashboard/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── projects/
│   │   │   └── ProjectList.js
│   │   ├── progress/
│   │   │   └── ProgressReports.js
│   │   ├── team/
│   │   │   └── FieldMonitors.js
│   │   ├── validation/
│   │   │   └── UpdateValidation.js
│   │   ├── reports/
│   │   │   └── ReportGenerator.js
│   │   └── notifications/
│   │       └── Notifications.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
```
#   p r a c t i c e  
 #   p r a c t i c e  
 