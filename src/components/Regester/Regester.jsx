import React, { useEffect, useState } from 'react'
import './Regester.css'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import PropagateLoader from './../../../node_modules/react-spinners/esm/PropagateLoader';
import { NavLink, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

const mySchema = zod.object({
  name: zod.string().nonempty('First name is required').min(3, "min length is 3").max(10, "max length is 10"),
  last_name: zod.string().nonempty(' Last name is required').min(3, "min length is 3").max(10, "max length is 10"),
  email: zod.email(),
  password: zod.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
  rePassword: zod.string().nonempty('Repassword is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
  gender: zod.enum(['male', 'female'], " "),
  dateOfBirth: zod.coerce.date(' ').refine((val) => {
    return new Date().getFullYear() - val.getFullYear() >= 18 ? true : false
  }, 'Age must be +18').transform((dateObj) => {
    return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`
  }),
}).refine((val) => val.password === val.rePassword,
  {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })

export default function Regester() {
  const [isFail, setIsFail] = useState(null);
  const [isLoad, setIsLoad] = useState(false)
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showRepasswordIcon, setShowRepasswordIcon] = useState(false);

  const togglePasswordVisibility = (state, stateFn) => {
    stateFn(!state);
  };

  const handlePasswordChange = (e, stateFn) => {
    if (e.target.value.length > 0) {
      stateFn(true);
    } else {
      stateFn(false);
    }
  };


  const { handleSubmit, register, formState, getFieldState } = useForm({
    defaultValues: {
      "name": "",
      "last_name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "dateOfBirth": "",
      "gender": ""
    },
    mode: 'onBlur',
    resolver: zodResolver(mySchema),
  })

  const myHandle = (data) => {
    setIsLoad(true)
    const sendData = {
      name: data.name + " " + data.last_name,
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    }
    // console.log(sendData);
    axios.post('https://linked-posts.routemisr.com/users/signup', sendData)
      .then((res) => {
        // console.log(res);
        toast.success('Regestred Succeesfully', {
          position: 'top-center',
          autoClose: 1000,
        })
        setTimeout(function () {
          navigate('/login')
        }, (1000))
      })
      .catch((rej) => {
        // console.log(rej.response.data.error);
        toast.error(rej.response.data.error, {
          position: "top-center"
        })
      }).finally(() => {
        setIsLoad(false)
      })
  }


  return (
    <section className='bg-gray min-h-dvh flex items-center justify-center mt-5  mb-15'>
      <div >
        <div className="w-fit mx-auto shadow-xl p-10 rounded-2xl">
          <h1 className='select-none text-[#1d4ed8] text-3xl  md:text-5xl text-center font-bold mb-7
        '>Create an Account</h1>
          <form className="md:w-2xl mx-auto " onSubmit={handleSubmit(myHandle)}>
            {/* name */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* first name */}
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register('name')} id="name" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] block py-2.5 px-0 w-full  text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                {formState.errors.name && formState.touchedFields.name && <p className='text-red-600'>{formState.errors.name?.message}</p>}
              </div>
              {/* Last name */}
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register('last_name')} id="last_name" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                {formState.errors.last_name && formState.touchedFields.last_name && <p className='text-red-600'>{formState.errors.last_name?.message}</p>}
              </div>
            </div>
            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
              <input {...register('email')} type="email" id="email" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {formState.errors.email && formState.touchedFields.email && <p className='text-red-600'>{formState.errors.email?.message}</p>}
            </div>
            {/* Password */}
            <div className="relative z-0 w-full mb-5 group">
              <input {...register('password', {
                onChange: (e) => { handlePasswordChange(e, setShowPasswordIcon) }
              })} type={showPassword ? 'text' : 'password'} autoComplete="new-password" id="password" className="block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="password" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {showPasswordIcon && <button type="button" className='absolute end-3 top-1/2 z-10 cursor-pointer ' onClick={() => { togglePasswordVisibility(showPassword, setShowPassword) }} > {showPassword ? <FaEyeSlash /> : <FaRegEye />} </button>}            </div>
            {formState.errors.password && formState.touchedFields.password && <p className='text-red-600  -translate-y-5'>{formState.errors.password?.message}</p>}
            {/* Re-Password*/}
            <div className="relative z-0 w-full mb-5 group">
              <input {...register('rePassword',
                { onChange: (e) => { handlePasswordChange(e, setShowRepasswordIcon) } }
              )} type={showRepassword ? 'text' : 'password'} autoComplete="new-password" id="rePassword" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
              {showRepasswordIcon && <button type="button" className='absolute end-3 top-1/2 z-10 cursor-pointer ' onClick={() => { togglePasswordVisibility(showRepassword, setShowRepassword) }}> {showRepassword ? <FaEyeSlash /> : <FaRegEye />} </button>}            </div>
            {formState.errors.rePassword && formState.touchedFields.rePassword && <p className='text-red-600 -translate-y-5'>{formState.errors.rePassword?.message}</p>}
            {/* Gender */}
            <div className="relative z-0 w-full mb-5 group">
              <h3 className="mb-2 font-semibold text-gray-900 ">Gender</h3>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
                {/* Male */}
                <li className="w-full border border-gray-200   rounded-sm">
                  <div className="flex items-center ps-3">
                    <input {...register('gender')} id="horizontal-list-radio-license" value='male' type="radio" name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  " />
                    <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Male </label>
                  </div>
                </li>
                {/* Female */}
                <li className="w-full">
                  <div className="flex items-center ps-3">
                    <input {...register('gender')} id="horizontal-list-radio-id" type="radio" value='female' name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">Female</label>
                  </div>
                </li>
              </ul>
              {formState.errors.gender && formState.touchedFields.gender && <p className='text-red-600'>{formState.errors.gender?.message}</p>}
            </div>
            {/* Date */}
            <div className=" w-full my-6 group">
              <div className="relative z-0">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input {...register('dateOfBirth')} id="dateOfBirth" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Select date" />
              </div>
              {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className='text-red-600 ms-3'>{formState.errors.dateOfBirth?.message}</p>}
            </div>
            {/* Btn */}
            {/* <PropagateLoader className='block mx-auto mt-10  text-center'/> */}
            {isLoad ? <PropagateLoader className='block mx-auto mt-15 mb-25 text-center' color="#0030fa" /> :
              <button type="submit" className=" font-[logote] tracking-widest block mx-auto mt-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-3xs px-5 py-2.5 text-center">Register</button>}
          </form>
          <div className="flex w-fit gap-2 mx-auto mt-7">
            <p className='select-none'>One of us?</p>
            <NavLink to="/login" className="font-bold block text-blue-700 " aria-current="page">LogIn</NavLink>
          </div>
        </div>
      </div>
    </section >
  )
}
