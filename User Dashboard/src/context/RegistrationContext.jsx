// src/context/RegistrationContext.js
import { createContext, useContext, useState } from 'react';

export const RegistrationContext = createContext();

export function useRegistration() {
  return useContext(RegistrationContext);
}

export function RegistrationProvider({ children }) {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    fullName: '',
    gender: '',
    phone: '',
    address: {},
  });

  const updateRegistrationData = (newData) => {
    setRegistrationData(prev => ({ ...prev, ...newData }));
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
}