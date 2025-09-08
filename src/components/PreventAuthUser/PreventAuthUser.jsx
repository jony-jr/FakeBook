import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function PreventAuthUser() {
  if(localStorage.getItem('tkn')){
    return <Navigate to='home'/>;
  }
  return <Outlet/>
}
