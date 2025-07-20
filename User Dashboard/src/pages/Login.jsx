import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import '../styles/auth.css';

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      try {
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (err) {
        console.error('Login error:', err);
        switch (err.code) {
          case 'auth/invalid-credential':
            setError('Invalid email or password. Please try again.');
            break;
          case 'auth/user-not-found':
            setError('No account found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password. Please try again.');
            break;
          default:
            setError('Login failed. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-card">

        
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

        
        <div className="social-icons-top">
          <div className="social-icon-circle" onClick={() => console.log('TODO: Apple login')}>
            <FaApple className="social-icon" />
          </div>
          <div className="social-icon-circle" onClick={() => console.log('TODO: Facebook login')}>
            <FaFacebookF className="social-icon-1" />
          </div>
          <div className="social-icon-circle" onClick={() => console.log('TODO: Google login')}>
            <FcGoogle className="social-icon" />
          </div>
        </div>

        <p className="register-subtitle">or log in with email</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={formik.handleSubmit} className="login-form">
          
          <div className="input-group">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.com"
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
              placeholder="**********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          
          <button type="submit" className="btn" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>

          
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
