import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/auth.css';

const AddAddress = () => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    locationType: Yup.string().required('Please select an option'),
    shareOptions: Yup.object().shape({
      peopleNearby: Yup.boolean(),
      deliveryTime: Yup.boolean(),
      shippingCosts: Yup.boolean()
    })
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      locationType: '',
      shareOptions: {
        peopleNearby: false,
        deliveryTime: true,
        shippingCosts: false
      }
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      navigate('/address-details'); // Changed from '/registration-complete' to '/address-details'
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
          {/* Address Search */}
          <div className="input-group">
            <label htmlFor="address">Search for address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className={formik.touched.address && formik.errors.address ? 'error' : ''}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="error-message">{formik.errors.address}</div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="privacy-notice">
            Your address is not visible to other users
          </div>

          {/* Location Options */}
          <div className="location-options">
            <button
              type="button"
              className={`location-option ${formik.values.locationType === 'current' ? 'active' : ''}`}
              onClick={() => formik.setFieldValue('locationType', 'current')}
            >
              Use current location
            </button>
            <button
              type="button"
              className={`location-option ${formik.values.locationType === 'manual' ? 'active' : ''}`}
              onClick={() => formik.setFieldValue('locationType', 'manual')}
            >
              Add manually
            </button>
          </div>
          {formik.touched.locationType && formik.errors.locationType && (
            <div className="error-message">{formik.errors.locationType}</div>
          )}

          {/* Sharing Options */}
          <div className="sharing-section">
            <h3>Sharing your address shows:</h3>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="peopleNearby"
                name="shareOptions.peopleNearby"
                checked={formik.values.shareOptions.peopleNearby}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="peopleNearby">People near you</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="deliveryTime"
                name="shareOptions.deliveryTime"
                checked={formik.values.shareOptions.deliveryTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="deliveryTime">Estimated delivery time</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="shippingCosts"
                name="shareOptions.shippingCosts"
                checked={formik.values.shareOptions.shippingCosts}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="shippingCosts">Estimated shipping costs</label>
            </div>
          </div>

          <button type="submit" className="save-btn">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;