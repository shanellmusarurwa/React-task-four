import { 
  FaHome, 
  FaChartLine, 
  FaShoppingCart, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, activeLink }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen ? (
          <h1 className="logo">KodeCamp</h1>
        ) : (
          <h1 className="logo">KC</h1>
        )}
      </div>

      <nav className="sidebar-menu">
        <a 
          href="#" 
          className={`menu-item ${activeLink === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <FaHome className="menu-icon" />
          {isOpen && <span className="menu-text">Dashboard</span>}
        </a>

        <a 
          href="#" 
          className={`menu-item ${activeLink === 'analytics' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/analytics');
          }}
        >
          <FaChartLine className="menu-icon" />
          {isOpen && <span className="menu-text">Analytics</span>}
        </a>

        <a 
          href="#" 
          className={`menu-item ${activeLink === 'products' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}
        >
          <FaShoppingCart className="menu-icon" />
          {isOpen && <span className="menu-text">Products</span>}
        </a>

        <a 
          href="#" 
          className={`menu-item ${activeLink === 'users' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/users');
          }}
        >
          <FaUsers className="menu-icon" />
          {isOpen && <span className="menu-text">Users</span>}
        </a>

        <a 
          href="#" 
          className={`menu-item ${activeLink === 'settings' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/settings');
          }}
        >
          <FaCog className="menu-icon" />
          {isOpen && <span className="menu-text">Settings</span>}
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="menu-item logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="menu-icon" />
          {isOpen && <span className="menu-text">Logout</span>}
        </button>

        {isOpen && (
          <div className="user-profile">
            <img 
              src={currentUser?.photoURL || '/default-avatar.png'} 
              alt="User" 
              className="user-avatar" 
            />
            <div className="user-info">
              <span className="user-name">
                {currentUser?.displayName || 'User'}
              </span>
              <span className="user-email">
                {currentUser?.email || 'user@example.com'}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;