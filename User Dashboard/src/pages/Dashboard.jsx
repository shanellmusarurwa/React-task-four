import React from 'react';
import { FiSearch } from 'react-icons/fi';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const customers = [
    {
      name: 'Jana Cooper',
      company: 'Microsoft',
      phone: '(225) 555-018',
      email: 'jana@microsoft.com',
      country: 'United States',
      status: 'Active'
    },
    {
      name: 'Floyd Miles',
      company: 'Yahoo',
      phone: '(206) 555-0100',
      email: 'floyd@yahoo.com',
      country: 'Kiribati',
      status: 'inactive'
    },
    {
      name: 'Ronald Richards',
      company: 'Adobe',
      phone: '(302) 555-0107',
      email: 'ronald@adobe.com',
      country: 'Israel',
      status: 'inactive'
    },
    {
      name: 'Marvin McKinney',
      company: 'Tesla',
      phone: '(252) 555-0126',
      email: 'marvin@tesla.com',
      country: 'Iran',
      status: 'Active'
    },
    {
      name: 'Jerome Bell',
      company: 'Google',
      phone: '(623) 555-0129',
      email: 'jerome@google.com',
      country: 'Réunion',
      status: 'Active'
    },
    {
      name: 'Kathryn Murphy',
      company: 'Microsoft',
      phone: '(406) 555-0102',
      email: 'kathryn@microsoft.com',
      country: 'Curaçao',
      status: 'Active'
    },
    {
      name: 'Jacob Jones',
      company: 'Yahoo',
      phone: '(208) 555-0122',
      email: 'jacob@yahoo.com',
      country: 'Brazil',
      status: 'Active'
    },
    {
      name: 'Kristin Watson',
      company: 'Facebook',
      phone: '(704) 555-0127',
      email: 'kristin@facebook.com',
      country: 'Åland Islands',
      status: 'inactive'
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <span className="menu-icon">📊</span>
            <span>Dashboard</span>
          </li>
          <li>
            <span className="menu-icon">👥</span>
            <span>Customers</span>
          </li>
          <li>
            <span className="menu-icon">📝</span>
            <span>Orders</span>
          </li>
          <li>
            <span className="menu-icon">📊</span>
            <span>Analytics</span>
          </li>
          <li>
            <span className="menu-icon">✉️</span>
            <span>Messages</span>
          </li>
          <li>
            <span className="menu-icon">⚙️</span>
            <span>Settings</span>
          </li>
          <li>
            <span className="menu-icon">🚪</span>
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <div className="header-top">
            <h1>Hello {user?.name || 'Evano'} 👋🏼,</h1>
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
          </div>
          </div>

          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-number">5,423</div>
                <div className="stat-label">Toolkit Customers</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <div className="stat-number">1,893</div>
                <div className="stat-label">New Customers</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-number">$12,345</div>
                <div className="stat-label">Active Now</div>
              </div>
            </div>
          </div>
        

        <div className="customers-section">
          <div className="section-header">
            <h2>All Customers</h2>
            <button className="active-btn">Active Members</button>
          </div>

          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.country}</td>
                    <td>
                      <span className={`status-badge ${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div>Showing data 1 to 8 of 256K entries</div>
            <div className="pagination">
              <button className="pagination-btn">{"<"}</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">4</button>
              <button className="pagination-btn">{">"}</button>
            </div>
          </div>
        </div>

        <div className="dashboard-footer">
          Downloaded from Fire...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;