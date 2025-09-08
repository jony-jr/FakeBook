import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import PropagateLoader from './../../../node_modules/react-spinners/esm/PropagateLoader';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { authContext } from '../../Contexts/AuthContextProvider';
import { toast } from 'react-toastify';

const mySchema = zod.object({
  email: zod.email().nonempty('Email is required'),
  password: zod.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'uppercase letter, lowercase letter, digit, special character, at least 8 characters long'),
})

export default function LogIn() {
  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(false)
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { insertUserToken } = useContext(authContext);
  // Handle togle change eye password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const inputPss = useRef(null)
  
  const handlePasswordChange = (e) => {
    if(e.target.value.length > 0){
      setShowPasswordIcon(true);
    }else{
      setShowPasswordIcon(false);
    }
  };

  const { handleSubmit, register, formState,getFieldState  } = useForm({
    defaultValues: {
      "email": "",
      "password": "",
    },
    mode: 'onSubmit',
    resolver: zodResolver(mySchema),
  })
  // console.log();
  
  const myHandle = (data) => {
    setIsLoad(true)
    // console.log(data);

    // console.log(data);
    axios.post('https://linked-posts.routemisr.com/users/signin', data)
      .then((res) => {
        // console.log('Token: ', res.data.token);
        insertUserToken(res.data.token)
        localStorage.setItem('tkn', res.data.token);
        navigate('/home')
      })
      .catch((rej) => {
        toast.error(rej.response.data.error,{
          position:'top-center'
        });
      }).finally(() => {
        setIsLoad(false)
      })

      
  }

  // const {mutate:hanleLoginProccess ,  isPending}=useMutation({
  //       mutationFn:handleLogin,
  //       onSuccess: function(res){
  //         insertUserToken(res.data.token)
  //       localStorage.setItem('tkn', res.data.token);
  //       navigate('/home')
  //       },
  //       onError: function(rej){
  //         toast.error(rej.response.data.error,{
  //         position:'top-center'
  //       });
  //       }
  //     })

  return (
    <section className='min-h-dvh  bg-gray flex items-center justify-center  '>
      <div className='p-5'>
        <div className="w-fit mx-auto shadow-xl p-10 rounded-2xl">
          <div className=" flex justify-center items-center flex-col gap-3 mb-5">
            <h1 className='text-[#1d4ed8] text-5xl md:text-6xl  font-bold select-none font-[quiska] tracking-widest'>fakebook</h1>
            <span className='text-xl select-none'>Login to Fakebook</span>
          </div>
          <form className=" md:w-2xl mx-auto " onSubmit={handleSubmit(myHandle)}>
            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
              <input {...register('email')} type="email" id="email" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {formState.errors.email && formState.touchedFields.email && <p className='text-red-600'>{formState.errors.email?.message}</p>}
            </div>
            {/* Password */}
            <div className="relative z-0 w-full mb-5 group">
              <input {...register('password',{
                onChange:handlePasswordChange,
              })} type={showPassword ? 'text' : 'password'} autoComplete="new-password" id="password" className="block py-2.5 px-0 w-full text-lg !text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label htmlFor="password" className="autofill:shadow-[inset_0_0_0px_1000px_theme(colors.white)] peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {showPasswordIcon &&  <button type="button" className='absolute end-3 top-1/2 z-10 cursor-pointer ' onClick={togglePasswordVisibility}> {showPassword ? <FaEyeSlash /> : <FaRegEye />} </button>}
            </div>
            {formState.errors.password && formState.touchedFields.password && <p className='text-red-600 -translate-y-5'>{formState.errors.password?.message}</p>}
            {isLoad ? <PropagateLoader className='block mx-auto mt-15 mb-25 text-center' color="#0030fa" /> :
              <button type="submit" className="font-[logote] tracking-widest block mx-auto mt-10  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-3xs px-5 py-2.5 text-center">Login</button>}
          </form>
          <div className="flex justify-center items-center gap-2 w-fit mx-auto my-7">
            <p className='select-none'>New here?</p>
            <NavLink to="/register" className="block font-bold  text-blue-700" aria-current="page">Register</NavLink>
          </div>
        </div>
      </div>
    </section>
  )
} 
