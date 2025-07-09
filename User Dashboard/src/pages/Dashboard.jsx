
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThLarge, FaBox, FaUsers, FaMoneyBillWave, FaBullhorn, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FiUser, FiClock, FiLogOut} from 'react-icons/fi';
import { BsGraphUp } from 'react-icons/bs';
import { auth } from '../firebase/config'; 
import '../styles/dashboard.css';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const customers = [
    
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      
      await auth.signOut();
      
      
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userSession');
      
      
      navigate('/login');
      
      
      alert('You have been logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1>Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <FaThLarge className="menu-icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <FaBox className="menu-icon" />
            <span>Product</span>
          </li>
          <li>
            <FaUsers className="menu-icon" />
            <span>Customers</span>
          </li>
          <li>
            <FaMoneyBillWave className="menu-icon" />
            <span>Income</span>
          </li>
          <li>
            <FaBullhorn className="menu-icon" />
            <span>Promote</span>
          </li>
          <li>
            <FaQuestionCircle className="menu-icon" />
            <span>Help</span>
          </li>
           {/* Logout Option */}
          <li onClick={handleLogout}>
            <FiLogOut className="menu-icon" />
            <span>Logout</span>
          </li> 
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="desktop-title">Dashboard</h1>
            <p className="welcome">Hello Evano</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FiUser />
              </div>
              <div className="stat-info">
                <div className="stat-number">5,423</div>
                <div className="stat-label">Total Customers</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <BsGraphUp />
              </div>
              <div className="stat-info">
                <div className="stat-number">1,893</div>
                <div className="stat-label">Members</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FiClock />
              </div>
              <div className="stat-info">
                <div className="stat-number">1,032</div>
                <div className="stat-label">Active Now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Section */}
        <div className="customers-section">
          <div className="section-header">
            <h2>All Customers</h2>
            <div className="section-actions">
              <button className="active-btn">Active Members</button>
            </div>
          </div>
          
          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td data-label="Name">{customer.name}</td>
                    <td data-label="Company">{customer.company}</td>
                    <td data-label="Phone">{customer.phone}</td>
                    <td data-label="Email">{customer.email}</td>
                    <td data-label="Country">{customer.country}</td>
                    <td data-label="Status">
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
            <span>Showing data 1 to 8 of 256K entries</span>
            <div className="pagination">
              <button className="pagination-btn">{"<"}</button>
              <button className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
              <button className={`pagination-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
              {window.innerWidth > 425 && (
                <>
                  <button className={`pagination-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
                  <button className={`pagination-btn ${currentPage === 4 ? 'active' : ''}`} onClick={() => setCurrentPage(4)}>4</button>
                </>
              )}
              {window.innerWidth > 375 && <span>...</span>}
              {window.innerWidth > 425 && (
                <button className="pagination-btn" onClick={() => setCurrentPage(40)}>40</button>
              )}
              <button className="pagination-btn">{">"}</button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-footer">
          <span>Downloaded from Fire...</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
