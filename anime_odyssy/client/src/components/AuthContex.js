import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("username")
  );

  const handleLogout = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("favorite_list");
    setIsLoggedIn(false); // Update isLoggedIn state
    console.log("Session storage cleared:", sessionStorage);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
