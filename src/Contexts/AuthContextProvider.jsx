import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('tkn') || null);
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Derived values from userData
  const logedUserId = userData?.data?.user?._id;
  const logedUserPhoto = userData?.data?.user?.photo;
  const logedUserName = userData?.data?.user?.name;
  const logedUserEmail = userData?.data?.user?.email;
  const logedUserdateOfBirth = userData?.data?.user?.dateOfBirth;

  // Update token and persist to localStorage
  function insertUserToken(userToken) {
    setToken(userToken);
    localStorage.setItem('tkn', userToken);
  }

  // Clear token and user data
  function clearUserToken() {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('tkn');
    localStorage.removeItem('userData');
  }

  // Update user data and persist to localStorage
  function updateUser(newUserData) {
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  }

  // Fetch user data from backend
  async function getUserData() {
    if (!token) return;
    try {
      const response = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
        headers: {
          token,
        },
      });
      updateUser(response);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      clearUserToken(); // Clear token if fetch fails (e.g., invalid token)
    }
  }

  // Fetch user data on mount or when token changes
  useEffect(() => {
    if (token && !userData) {
      getUserData();
    }
  }, [token]);

  return (
    <authContext.Provider
      value={{
        token,
        insertUserToken,
        clearUserToken,
        logedUserId,
        logedUserEmail,
        logedUserPhoto,
        logedUserName,
        logedUserdateOfBirth,
        updateUser, // Expose updateUser for Profile component
      }}
    >
      {children}
    </authContext.Provider>
  );
}