import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/auth.css';

const AddressDetails = () => {
  const navigate = useNavigate();

  // Form validation schema
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
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      navigate('/registration-success'); // Changed from '/registration-complete' to '/registration-success'
    },
  });

  return (
    <div className="address-container">
      <div className="address-card">
        <div className="progress-header">
          <h2>Add address</h2>
          <div className="progress-step">3 of 3</div>
        </div>

        <form onSubmit={formik.handleSubmit} className="address-form">
          {/* Street Address */}
          <div className="input-group">
            <label htmlFor="streetAddress">Street address</label>
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              placeholder="319 Balnbridge Street"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
              className={formik.touched.streetAddress && formik.errors.streetAddress ? 'error' : ''}
            />
            {formik.touched.streetAddress && formik.errors.streetAddress && (
              <div className="error-message">{formik.errors.streetAddress}</div>
            )}
          </div>

          {/* Apartment (Optional) */}
          <div className="input-group">
            <label htmlFor="apartment">Apartment <span className="optional">(Optional)</span></label>
            <input
              id="apartment"
              name="apartment"
              type="text"
              placeholder="Apt, suite, unit, etc."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apartment}
            />
          </div>

          {/* City */}
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="New York City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={formik.touched.city && formik.errors.city ? 'error' : ''}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="error-message">{formik.errors.city}</div>
            )}
          </div>

          {/* State and Zip Code - Side by Side */}
          <div className="row-input-group">
            <div className="input-group half-width">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                placeholder="New York"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                className={formik.touched.state && formik.errors.state ? 'error' : ''}
              />
              {formik.touched.state && formik.errors.state && (
                <div className="error-message">{formik.errors.state}</div>
              )}
            </div>
            <div className="input-group half-width">
              <label htmlFor="zipCode">Zip code</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="11233"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                className={formik.touched.zipCode && formik.errors.zipCode ? 'error' : ''}
              />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <div className="error-message">{formik.errors.zipCode}</div>
              )}
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save information
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressDetails;