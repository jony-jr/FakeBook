import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Regester from './components/Regester/Regester'
import LogIn from './components/LogIn/LogIn';
import Home from './components/Home/Home'
import AuthContextProvider from './Contexts/AuthContextProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Profile from './components/Profile/Profile';
import PreventAuthUser from './components/PreventAuthUser/PreventAuthUser'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostDetails from './components/PostDetails/PostDetails';
import { Bounce, Slide, ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      {
        path: '', element: <PreventAuthUser />, children: [
          { index: true, element: <LogIn /> },
          { path: 'login', element: <LogIn /> },
          { path: '/register', element: <Regester /> },
        ]
      },
      {
        path: '', element: <ProtectedRoute />, children: [
          { path: 'home', element: <Home /> },
          { path: 'profile', element: <Profile /> },
          { path: '/posts/:id', element: <PostDetails /> },
        ]
      },
      { path: '*', element: <h2 className='min-h-screen'>Page Not Found</h2> },
    ]
  }
])

const queryClient = new QueryClient();


export default function App() {
  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  )
}

