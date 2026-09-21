import React, { createContext, useContext, useState } from 'react';

interface AgeContextType {
  isVerified: boolean;
  verifyAge: () => void;
  rejectAge: () => void;
  isUnderage: boolean;
}

const AgeContext = createContext<AgeContextType | undefined>(undefined);

const STORAGE_KEY = 'khoi_nien_age_verified_18';

export const AgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [isUnderage, setIsUnderage] = useState<boolean>(false);

  const verifyAge = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVerified(true);
    setIsUnderage(false);
  };

  const rejectAge = () => {
    setIsUnderage(true);
  };

  return (
    <AgeContext.Provider value={{ isVerified, verifyAge, rejectAge, isUnderage }}>
      {children}
    </AgeContext.Provider>
  );
};

export const useAge = () => {
  const context = useContext(AgeContext);
  if (!context) {
    throw new Error('useAge must be used within an AgeProvider');
  }
  return context;
};
