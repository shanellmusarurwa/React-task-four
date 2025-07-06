import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  
  const customers = [
    {
      id: 1,
      name: 'Jana Cooper',
      company: 'Microsoft',
      phone: '(225) 555-018',
      email: 'jana@microsoft.com',
      country: 'United States',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Floyd Miles',
      company: 'Yahoo',
      phone: '(206) 555-0100',
      email: 'floyd@yahoo.com',
      country: 'Kiribati',
      status: 'inactive'
    },
    {
      id: 3,
      name: 'Ronald Richards',
      company: 'Adobe',
      phone: '(302) 555-0107',
      email: 'ronald@adobe.com',
      country: 'Israel',
      status: 'inactive'
    },
    {
      id: 4,
      name: 'Marvin McKinney',
      company: 'Tesla',
      phone: '(252) 555-0126',
      email: 'marvin@tesla.com',
      country: 'Iran',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Jerome Bell',
      company: 'Google',
      phone: '(623) 555-0129',
      email: 'jerome@google.com',
      country: 'Réunion',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Kathryn Murphy',
      company: 'Microsoft',
      phone: '(406) 555-0102',
      email: 'kathryn@microsoft.com',
      country: 'Curaçao',
      status: 'Active'
    },
    {
      id: 7,
      name: 'Jacob Jones',
      company: 'Yahoo',
      phone: '(208) 555-0122',
      email: 'jacob@yahoo.com',
      country: 'Brazil',
      status: 'Active'
    },
    {
      id: 8,
      name: 'Kristin Watson',
      company: 'Facebook',
      phone: '(704) 555-0127',
      email: 'kristin@facebook.com',
      country: 'Åland Islands',
      status: 'inactive'
    }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={`dashboard-container ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeLink="dashboard" 
      />
      
      <div className="main-content">
        <Header 
          user={user} 
          toggleSidebar={toggleSidebar} 
        />
        
        <div className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>
          
          <div className="welcome-section">
            <h2>Hello Evano</h2>
          </div>
          
          <div className="stats-section">
            <div className="stats-card">
              <h3>Toolkit Customers</h3>
              <div className="stats-numbers">
                <span className="main-stat">5,423</span>
                <span className="secondary-stat">1,893</span>
              </div>
            </div>
          </div>
          
          <div className="customers-section">
            <h3>All Customers</h3>
            
            <div className="customers-table">
              <div className="table-header">
                <div>Customer Name</div>
                <div>Category</div>
                <div>Phone Number</div>
                <div>Email</div>
                <div>Country</div>
                <div>Status</div>
              </div>
              
              {customers.map(customer => (
                <div className="table-row" key={customer.id}>
                  <div className="customer-name">{customer.name}</div>
                  <div>{customer.company}</div>
                  <div>{customer.phone}</div>
                  <div>{customer.email}</div>
                  <div>{customer.country}</div>
                  <div>
                    <span className={`status-badge ${customer.status === 'Active' ? 'active' : 'inactive'}`}>
                      {customer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;