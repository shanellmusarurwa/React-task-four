// src/components/RegistrationProgress.jsx
import { useLocation } from 'react-router-dom';

const RegistrationProgress = () => {
  const location = useLocation();
  const steps = [
    { path: '/register', label: 'Account' },
    { path: '/personal-info', label: 'Personal Info' },
    { path: '/address-form', label: 'Address Form'},
    { path: '/address-search', label: 'Address' },
    { path: '/address-details', label: 'Details' },
    { path: '/registration-success', label: 'Complete' }
  ];

  const currentIndex = steps.findIndex(step => location.pathname === step.path);

  return (
    <div className="registration-progress">
      {steps.map((step, index) => (
        <div 
          key={step.path} 
          className={`step ${index <= currentIndex ? 'active' : ''}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step.label}</div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </div>
      ))}
    </div>
  );
};

export default RegistrationProgress;