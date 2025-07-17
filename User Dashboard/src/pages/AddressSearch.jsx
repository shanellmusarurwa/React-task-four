import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';   
import '../styles/auth.css';

const AddressDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 

  
  const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required('Street address is required'),
    apartment: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(5, 'Must be exactly 5 digits')
      .max(5, 'Must be exactly 5 digits')
  });
const formik = useFormik({
    initialValues: {
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: ''
    },
    validationSchema,
    onSubmit: async (values) => {
    try {
      // 1. Safely get personal info from localStorage
      let personalInfo = {};
      try {
        const storedData = localStorage.getItem('personalInfo');
        personalInfo = storedData ? JSON.parse(storedData) : {};
      } catch (parseError) {
        console.warn('Could not parse personalInfo:', parseError);
      }

      // 2. Create complete user object
      const userData = {
        ...personalInfo,
        address: {
          street: values.streetAddress,
          apartment: values.apartment,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode
        }
      };

      // 3. Save to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // 4. Log success
      console.log('User data saved:', userData);
      
      // 5. Navigate to success screen
      navigate('/registration-success');
      
    } catch (error) {
      console.error('Error saving user data:', error);
      // Optionally show error to user
      // setSubmissionError('Failed to save user data');
    }
  }
  });
 
  return (
    <div className="address-container">
      <div className="address-card">
        <div className="progress-header">
          <h2>Add address</h2>
          <div className="progress-step">3 of 3</div>
        </div>

        <form onSubmit={formik.handleSubmit} className="manual-address-form">
          {/* Street Address */}
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
              placeholder="319 Balnbridge Street"
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <div className="error-message">{formik.errors.streetAddress}</div>
            )}
          </div>

          {/* Apartment (Optional) */}
          <div className="form-group">
            <label htmlFor="apartment">Apartment <span className="optional">(Optional)</span></label>
            <input
              id="apartment"
              name="apartment"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apartment}
              placeholder="Apt, suite, unit, etc."
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder="New York City"
            />
            {formik.touched.city && formik.errors.city && (
              <div className="error-message">{formik.errors.city}</div>
            )}
          </div>

          {/* State and Zip Code */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                placeholder="New York"
              />
              {formik.touched.state && formik.errors.state && (
                <div className="error-message">{formik.errors.state}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                placeholder="11233"
              />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <div className="error-message">{formik.errors.zipCode}</div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Saving...' : 'Save Information'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressDetails;