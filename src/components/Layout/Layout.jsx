import React, { useEffect } from 'react'
import Nav from './../Nav/Nav';
import Footer from './../Footer/Footer';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
export default function Layout() {
  
  const location = useLocation();
  useEffect(() => {
    // Define a mapping of paths to titles
    const pageTitles = {
      '/': 'LogIn Page',
      '/login': 'LogIn Page',
      '/register': 'Register Page',
      '/home': 'Home Page',
      '/profile': 'Profile Page',
      '*': 'Not found Page',
    };
    document.title = pageTitles[location.pathname] || 'FakeBook';
  }, [location]); // Update title when the route changes
  return (
    <>
      <Nav />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  )
}
