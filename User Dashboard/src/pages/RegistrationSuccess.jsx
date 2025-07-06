import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        {/* Image from Unsplash */}
        <div className="success-image">
          <img 
            src="./public/successful.png" 
            alt="Success" 
          />
        </div>
        
        <div className="success-content">
          <h1>You are successfully registered!</h1>
          
          <button 
            onClick={() => navigate('/login')} 
            className="login-btn"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;