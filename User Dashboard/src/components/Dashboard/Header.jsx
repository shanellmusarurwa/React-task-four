import { FaBell, FaSearch, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1 className="header-title">Dashboard</h1>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-profile">
          <img 
            src={currentUser?.photoURL || '/default-avatar.png'} 
            alt="User" 
            className="user-avatar" 
          />
          <span className="user-name">
            {currentUser?.displayName || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;