import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const RegistrationContext = createContext();

// Custom hook to use the context
export const useRegistration = () => useContext(RegistrationContext);

// Provider component to wrap the app
export const RegistrationProvider = ({ children }) => {
  const [institutionType, setInstitutionType] = useState(
    sessionStorage.getItem('institutionType') || ''
  );

  const [institutionData, setInstitutionData] = useState(
    JSON.parse(sessionStorage.getItem('institutionData')) || {
      name: '',
      address: '',
      email: '',
      domainName: ''
    }
  );

  const [ownerData, setOwnerData] = useState(
    JSON.parse(sessionStorage.getItem('ownerData')) || {
      email: '',
      phoneNumber: '',
      username: '',
      password: ''
    }
  );

  // Sync state with sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('institutionType', institutionType);
    sessionStorage.setItem('institutionData', JSON.stringify(institutionData));
    sessionStorage.setItem('ownerData', JSON.stringify(ownerData));
  }, [institutionType, institutionData, ownerData]);

  const value = {
    institutionType,
    setInstitutionType,
    institutionData,
    setInstitutionData,
    ownerData,
    setOwnerData
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
