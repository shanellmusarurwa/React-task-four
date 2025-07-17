import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import '../styles/auth.css';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const countryCodes = [
    { code: '+598', name: 'Uruguay' },
    { code: '+1', name: 'USA/Canada' },
    { code: '+44', name: 'UK' },
    { code: '+27', name: 'South Africa' },
    { code: '+263', name: 'Zimbabwe' }
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required')
      .min(3, 'Must be at least 3 characters'),
    gender: Yup.string().required('Gender is required'),
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
      countryCode: '+598',
      phoneVisible: false
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate('/address-form');
    },
  });

  const handleCountryCodeSelect = (code) => {
    formik.setFieldValue('countryCode', code);
    setShowCountryCodes(false);
  };


  return (
    <div className="personal-info-container">
      <div className="personal-info-card">
        <div className="progress-header">
          <h2>Personal information</h2>
          <div className="progress-step">2 of 3</div>
        </div>

        <form onSubmit={formik.handleSubmit} className="personal-info-form">
          {/* Full Name */}
          <div className="input-field">
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full name"
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
          <div className="gender-field">
            <div className="gender-label">Gender: 
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === 'male'}
                  onChange={formik.handleChange}
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
                />
                <span className="radio-label">Female</span>
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className="error-message">{formik.errors.gender}</div>
            )}
          </div>

          {/* Phone Visibility */}
          <div className="visibility-notice">
            <strong>The phone number and birthday are only visible to you</strong>
          </div>

          {/* Phone Number */}
          <div className="phone-field">
            <div className="phone-input-container">
              <div className="country-code-selector" onClick={() => setShowCountryCodes(!showCountryCodes)}>
                <span>{formik.values.countryCode}</span>
                <FaChevronDown className="dropdown-icon" />
                {showCountryCodes && (
                  <div className="country-code-dropdown">
                    {countryCodes.map((country) => (
                      <div 
                        key={country.code} 
                        className="country-code-option"
                        onClick={() => handleCountryCodeSelect(country.code)}
                      >
                        {country.code} {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone number"
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
           {/* Birthday Field - Exact Match to Image */}
<div className="birthday-field">
  <div className="date-input-container">
    <input
      id="birthday"
      name="birthday"
      type="date"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.birthday}
      className={formik.touched.birthday && formik.errors.birthday ? 'error' : ''}
    />
    <div className="date-content">
      <span className="birthday-text">Birthday</span>
      <div className="right-elements">
        <span className="optional-text">Optional</span>
        <FaCalendarAlt className="calendar-icon" />
      </div>
    </div>
  </div>
  <div className="birthday-note">Let us know about your birthday so as not to miss a gift.</div>
  {formik.touched.birthday && formik.errors.birthday && (
    <div className="error-message">{formik.errors.birthday}</div>
  )}
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