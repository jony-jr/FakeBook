import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute() {
  if(localStorage.getItem('tkn') ==null){
    return <Navigate to={'/login'}/>
  }
  
  return <Outlet/>;
}
