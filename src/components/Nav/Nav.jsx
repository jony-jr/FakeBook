import React, { useContext, useEffect, useState } from 'react'
import './Nav.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContextProvider'
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import DarkMode from '../DarkMode/DarkMode';

export default function Nav() {
  const { token ,clearUserToken} = useContext(authContext);
  const navigate = useNavigate();
  function hanleLogout() {
    localStorage.removeItem('tkn')
    clearUserToken()
    navigate('/login')

  }
  return (
    <>
      {token && <>
        <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 z-50 fixed top-0 start-0 end-0">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <NavLink to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="font-[logote] tracking-widest text-blue-600 self-center text-2xl  dark:text-white">FakeBook</span>
            </NavLink>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className=" text-xl flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0   dark:border-gray-700">
                <li>
                  <NavLink to="/home" className="block py-2 px-3 text-blue-900  rounded-sm md:bg-transparent  md:p-0 dark:text-white " >Home</NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="block py-2 px-3 text-blue-900  rounded-sm md:bg-transparent  md:p-0 dark:text-white " >Profile</NavLink>
                </li>
                <li>
                  <span onClick={hanleLogout} className="block py-2 px-3 text-blue-900  rounded-sm md:bg-transparent  md:p-0 dark:text-white cursor-pointer" >Logout</span>
                </li>
                <DarkMode />
                <li>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>}
    </>
  )
}
