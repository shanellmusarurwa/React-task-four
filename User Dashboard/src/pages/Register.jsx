import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRegistration } from '../context/RegistrationContext';
import { registerSchema } from '../utils/validationSchemas';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import '../styles/auth.css';

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('register');
  const navigate = useNavigate();
  const { register } = useAuth();
  const { updateRegistrationData } = useRegistration();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      acceptPromotions: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      try {
        await register(values.email, values.password);

        updateRegistrationData({
          email: values.email,
          password: values.password,
          acceptPromotions: values.acceptPromotions,
        });

        navigate('/personal-info');
      } catch (err) {
        console.error('Registration Error:', err.message);
        setError(err.message || 'Failed to create account');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-card">

  
        <div className="auth-tabs">
          <button
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => navigate('/login')}
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

        <p className="register-subtitle">or register with email</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={formik.handleSubmit} className="register-form">
          
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
            <div className="password-hint">8 characters minimum</div>
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          
          <div className="newsletter-checkbox">
            <input
              type="checkbox"
              id="acceptPromotions"
              name="acceptPromotions"
              checked={formik.values.acceptPromotions}
              onChange={formik.handleChange}
            />
            <label htmlFor="acceptPromotions">Send me news and promotions</label>
          </div>

          
          <div className="terms-text">
            By clicking, you agree to our{' '}
            <Link to="/terms">Terms & Conditions</Link> and{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
