import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/auth.css';

const PersonalInfo = () => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(3, 'Must be at least 3 characters'),
    gender: Yup.string()
      .required('Gender is required'),
    phone: Yup.string()
      .matches(/^\+?[0-9\s-]+$/, 'Invalid phone number')
      .required('Phone number is required'),
    birthday: Yup.date()
      .nullable()
      .max(new Date(), 'Birthday cannot be in the future')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      gender: '',
      phone: '',
      birthday: '',
      phoneVisible: false
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      navigate('/address-search'); // Changed from '/next-step' to '/address-search'
    },
  });

  const [countryCode, setCountryCode] = useState('+598');

  return (
    <div className="personal-info-container">
      <div className="personal-info-card">
        <div className="progress-header">
          <h2>Personal information</h2>
          <div className="progress-step">2 of 3</div>
        </div>

        <form onSubmit={formik.handleSubmit} className="personal-info-form">
          {/* Full Name */}
          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className={formik.touched.fullName && formik.errors.fullName ? 'error' : ''}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="error-message">{formik.errors.fullName}</div>
            )}
          </div>

          {/* Gender */}
          <div className="input-group">
            <label>Gender</label>
            <div className="gender-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === 'male'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="radio-label">Male</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === 'female'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="radio-label">Female</span>
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className="error-message">{formik.errors.gender}</div>
            )}
          </div>

          {/* Phone Number Visibility */}
          <div className="visibility-notice">
            <input
              type="checkbox"
              id="phoneVisible"
              name="phoneVisible"
              checked={formik.values.phoneVisible}
              onChange={formik.handleChange}
            />
            <label htmlFor="phoneVisible">The phone number and birthday are only visible to you</label>
          </div>

          {/* Phone Number */}
          <div className="input-group">
            <label htmlFor="phone">Phone number</label>
            <div className="phone-input">
              <select 
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="country-code"
              >
                <option value="+598">+598 (UY)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={formik.touched.phone && formik.errors.phone ? 'error' : ''}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <div className="error-message">{formik.errors.phone}</div>
            )}
          </div>

          {/* Birthday */}
          <div className="input-group">
            <label htmlFor="birthday">Birthday <span className="optional">(Optional)</span></label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday}
              className={formik.touched.birthday && formik.errors.birthday ? 'error' : ''}
            />
            {formik.touched.birthday && formik.errors.birthday && (
              <div className="error-message">{formik.errors.birthday}</div>
            )}
            <p className="birthday-note">Let us know about your birthday so as not to miss a gift.</p>
          </div>

          <button type="submit" className="save-btn">
            Save information
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;