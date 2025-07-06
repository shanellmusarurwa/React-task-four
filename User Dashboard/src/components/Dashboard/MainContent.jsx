import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const MainContent = ({ stats }) => {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'dollar':
        return <span className="stat-icon">$</span>;
      case 'users':
        return <span className="stat-icon">👥</span>;
      case 'projects':
        return <span className="stat-icon">📁</span>;
      default:
        return <span className="stat-icon">📊</span>;
    }
  };

  return (
    <div className="dashboard-content">
      {/* Stats Cards Section */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-header">
              <h3 className="stat-title">{stat.title}</h3>
              <div className={`stat-icon-container ${stat.icon}`}>
                {getIconComponent(stat.icon)}
              </div>
            </div>
            <div className="stat-body">
              <p className="stat-value">{stat.value.toLocaleString()}</p>
              <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                <span>{Math.abs(stat.change)}%</span>
                <span className="stat-period">{stat.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project Update</td>
                <td>John Doe</td>
                <td>10 mins ago</td>
                <td><span className="status-badge success">Completed</span></td>
              </tr>
              <tr>
                <td>New User</td>
                <td>Jane Smith</td>
                <td>25 mins ago</td>
                <td><span className="status-badge pending">Pending</span></td>
              </tr>
              <tr>
                <td>Payment Received</td>
                <td>Mike Johnson</td>
                <td>1 hour ago</td>
                <td><span className="status-badge success">Completed</span></td>
              </tr>
              <tr>
                <td>Server Maintenance</td>
                <td>System</td>
                <td>2 hours ago</td>
                <td><span className="status-badge warning">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainContent;