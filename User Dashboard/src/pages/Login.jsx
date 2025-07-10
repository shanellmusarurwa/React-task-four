
import { useState } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../context/AuthContext'; 
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { loginSchema } from '../utils/validationSchemas';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import '../styles/auth.css';


const Login = () =>{
  const { login } = useAuth(); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();


 const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Password is required'),
  });

const formik = useFormik({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema,
  onSubmit: async (values) => {
    try {
      setLoading(true);
      setError(''); 
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err); 
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }
});

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Tabs for Register/Login */}
        <div className="auth-tabs">
          <button
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Log in
          </button>
        </div>

       
        
        {/* Social Icons */}
        <div className="social-icons-top">
          <div className="social-icon-circle">
            <FaApple className="social-icon" />
          </div>
          <div className="social-icon-circle">
            <FaFacebookF className="social-icon" />
          </div>
          <div className="social-icon-circle">
            <FaGoogle className="social-icon" />
          </div>
        </div>

        <p className="register-subtitle">or register with email</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="input-group">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address example@mail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password ********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
