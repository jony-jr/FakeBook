import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const authContext = createContext()
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('tkn'))
  // const [logedUserId, setLogedUserId] = useState(null)
  const [userData, setUserData] = useState(null)
  const logedUserId = userData?.data.user._id
  const logedUserPhoto = userData?.data.user.photo
  const logedUserName = userData?.data.user.name
  const logedUserEmail = userData?.data.user.email
  function insertUserToken(userToken) {
    setToken(userToken)
  }
  function clearUserToken(userToken) {
    setToken(null)
  }
  
  //Decode token if exist
  // useEffect(
  //   function(){
  //     if(token){
  //       const userID = jwtDecode(token).user
  //       // setLogedUserId(userID)
  //     }
  //   }
  // ,[token])
  
  function getUserData(){
    return axios.get('https://linked-posts.routemisr.com/users/profile-data',{
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
    .then(function(res){
      setUserData(res)
    })
  }
  
  useEffect(() => {
    getUserData()
  }, [])
  

  return (
    <authContext.Provider value={{ token, insertUserToken, clearUserToken , logedUserId ,logedUserEmail,logedUserPhoto,logedUserName }}>
      {children}
    </authContext.Provider>
  )
}
