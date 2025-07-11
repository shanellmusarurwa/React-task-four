import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRegistration } from '../context/RegistrationContext';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { registerSchema } from '../utils/validationSchemas';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import '../styles/auth.css';


 

const Register = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const { updateRegistrationData } = useRegistration();
  const [activeTab, setActiveTab] = useState('register');
  const navigate = useNavigate();
  const { register } = useAuth();

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
      password: '',
      acceptPromotions: false
    },
    validationSchema,
    onSubmit: (values) => {
      navigate('/personal-info');
    }
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

        
        
        {/* Social Icons */}
        <div className="social-icons-top">
          <div className="social-icon-circle">
            <FaApple className="social-icon" />
          </div>
          <div className="social-icon-circle">
            <FaFacebookF className="social-icon-1" />
          </div>
          <div className="social-icon-circle">
            <FcGoogle className="social-icon" />
          </div>
        </div>

        <p className="register-subtitle">or register with email</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={formik.handleSubmit} className="register-form">
          <div className="input-group">
            <label>Email address</label>
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
            <label>Password</label>
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

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="newsletter-checkbox">
            <input
              type="checkbox"
              id="newsletter"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            <label htmlFor="newsletter">Send me news and promotions</label>
          </div>

          <div className="terms-text">
            By clicking, you agree to our <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;