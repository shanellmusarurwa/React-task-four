import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FaLocationArrow, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const AddressForm = () => {;
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State/Province is required'),
    postalCode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
    showPeopleNearYou: Yup.boolean(),
    showDeliveryTime: Yup.boolean(),
    showShippingCosts: Yup.boolean()
  });

  const formik = useFormik({
    initialValues: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      showPeopleNearYou: false,
      showDeliveryTime: true,
      showShippingCosts: false
    },
    validationSchema,
    onSubmit: (values) => {
      console.log( values);
        navigate('/address-search');
      
    }
  });

  const handleUseCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            formik.setValues({
              ...formik.values,
              address: data.address.road || '',
              city: data.address.city || data.address.town || '',
              state: data.address.state || '',
              postalCode: data.address.postcode || '',
              country: data.address.country || ''
            });
          }
        } catch (error) {
          setLocationError('Failed to get address from coordinates');
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <div className="address-form-container">
      <div className="address-form-header">
        <h2>Add address</h2>
        <span className="step-indicator">3 of 3</span>
      </div>

      <div className="search-section">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for address" 
            className="search-field"
          />
        </div>
        <p className="privacy-note">Your address is not visible to other users</p>
      </div>

      <div className="action-buttons">
        <button 
          className={`location-button ${isGettingLocation ? 'loading' : ''}`}
          onClick={handleUseCurrentLocation}
          disabled={isGettingLocation}
          type="button"
        >
          {isGettingLocation ? (
            'Locating...'
          ) : (
            <>
              <FaLocationArrow className="button-icon" />
             <span>Use current location</span> 
            </>
          )}
        </button>
        <button 
          className="manual-button"
          onClick={() => navigate('/address-search')}
          type="button"
        >
          <FaMapMarkerAlt className="button-icon" />
          <span>Add manually</span>
        </button>
      </div>

      {locationError && (
        <div className="error-message">{locationError}</div>
      )}

    
      <div className="sharing-options">
        <h3>Sharing your address shows:</h3>
        
        <label className="checkbox-option">
          <input 
            type="checkbox" 
            name="showPeopleNearYou"
            checked={formik.values.showPeopleNearYou}
            onChange={formik.handleChange}
          />
          <span className="checkmark"></span>
          People near you
        </label>
        
        <label className="checkbox-option">
          <input 
            type="checkbox" 
            name="showDeliveryTime"
            checked={formik.values.showDeliveryTime}
            onChange={formik.handleChange}
          />
          <span className="checkmark"></span>
          Estimated delivery time
        </label>
        
        <label className="checkbox-option">
          <input 
            type="checkbox" 
            name="showShippingCosts"
            checked={formik.values.showShippingCosts}
            onChange={formik.handleChange}
          />
          <span className="checkmark"></span>
          Estimate shipping costs
        </label>
      </div>
    </div>
  );
};

export default AddressForm;