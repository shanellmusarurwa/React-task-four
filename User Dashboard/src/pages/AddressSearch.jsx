import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AddressDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 

  const validationSchema = Yup.object({
    streetAddress: Yup.string().required('Street address is required'),
    apartment: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^[0-9]{5}$/, 'Zip code must be exactly 5 digits'),
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
        let personalInfo = {};
        const stored = localStorage.getItem('personalInfo');
        if (stored) personalInfo = JSON.parse(stored);

        const userData = {
          ...personalInfo,
          address: {
            street: values.streetAddress.trim(),
            apartment: values.apartment.trim(),
            city: values.city.trim(),
            state: values.state.trim(),
            zipCode: values.zipCode.trim()
          }
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved:', userData);
        navigate('/registration-success');
      } catch (error) {
        console.error('Error saving user data:', error);
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
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              autoComplete="street-address"
              placeholder="319 Bainbridge Street"
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <div className="error-message">{formik.errors.streetAddress}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="apartment">Apartment <span className="optional">(Optional)</span></label>
            <input
              id="apartment"
              name="apartment"
              type="text"
              autoComplete="address-line2"
              placeholder="Apt, suite, unit, etc."
              value={formik.values.apartment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="New York City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="error-message">{formik.errors.city}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                autoComplete="address-level1"
                placeholder="New York"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                autoComplete="postal-code"
                placeholder="11233"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
