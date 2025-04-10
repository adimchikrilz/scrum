import React, { createContext, useState, useEffect } from 'react';

const ClaimsContext = createContext();

const ClaimsProvider = ({ children }) => {
  // Initialize claims from localStorage if available
  const [claims, setClaims] = useState(() => {
    const storedClaims = localStorage.getItem('verifiedClaims');
    return storedClaims ? JSON.parse(storedClaims) : [];
  });

  // Persist claims to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('verifiedClaims', JSON.stringify(claims));
  }, [claims]);

  // Function to add a new claim
  const addClaim = (newClaim) => {
    setClaims((prevClaims) => [
      ...prevClaims,
      { ...newClaim, id: Date.now() }, // Add a unique ID using timestamp
    ]);
  };

  return (
    <ClaimsContext.Provider value={{ claims, addClaim }}>
      {children}
    </ClaimsContext.Provider>
  );
};

export { ClaimsContext, ClaimsProvider };