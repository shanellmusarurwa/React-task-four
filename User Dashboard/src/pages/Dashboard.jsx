import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import '../styles/dashboard.css';

const Dashboard = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      {isMobile && (
        <header className="mobile-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1>Hello {user?.name || 'Evano'}</h1>
        </header>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          {isMobile && (
            <button className="close-sidebar" onClick={toggleSidebar}>
              <FiX size={20} />
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </li>
            <li>
              <span className="nav-icon">👥</span>
              <span>Customers</span>
            </li>
            <li>
              <span className="nav-icon">📝</span>
              <span>Orders</span>
            </li>
            <li>
              <span className="nav-icon">📊</span>
              <span>Analytics</span>
            </li>
            <li>
              <span className="nav-icon">✉️</span>
              <span>Messages</span>
            </li>
            <li>
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </li>
            <li>
              <span className="nav-icon">🚪</span>
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Desktop Header */}
        {!isMobile && (
          <header className="desktop-header">
            <h1>Hello {user?.name || 'Evano'}, welcome back!</h1>
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>
        )}

        {/* Stats Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>5,423</h3>
              <p>Toolkit Customers</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>1,893</h3>
              <p>New Customers</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>$12,345</h3>
              <p>Active Now</p>
            </div>
          </div>
        </section>

        {/* Customers Section */}
        <section className="customers-section">
  <div className="section-header">
    <div className="header-left">
      <h2>All Customers</h2>
      <span className="active-members-label">Active Members</span>
    </div>

    <div className="search-container">
      <FiSearch className="search-icon" />
      <input 
        type="text" 
        placeholder="Search ..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="sort-dropdown">
      <select className="filter-select">
        <option>Newest</option>
        <option>Oldest</option>
      </select>
    </div>
  </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th className="hide-on-mobile">Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.phone}</td>
                    <td className="hide-on-mobile">{customer.email}</td>
                    <td>{customer.country}</td>
                    <td> 
                      <span className={`status ${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="showing-entries">
              Showing data 1 to 8 of 256K entries
            </div>
            <div className="pagination">
              <button className="page-btn">{"<"}</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <button className="page-btn">{">"}</button>
            </div>
          </div>
        </section>

        <div className="dashboard-footer">
          Downloaded from Fire...
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 
