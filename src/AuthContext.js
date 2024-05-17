import React, {useState, createContext, useEffect } from 'react';

const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('auth') || 'nie dziala');

  useEffect(() => {
    localStorage.setItem('auth', auth);
    
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };