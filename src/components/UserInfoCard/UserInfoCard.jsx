import React, { useContext } from 'react'
import './UserInfoCard.css'
import { authContext } from '../../Contexts/AuthContextProvider'
export default function UserInfoCard({postsNum=0}) {
  const {logedUserPhoto,logedUserName,logedUserEmail,logedUserdateOfBirth}= useContext(authContext)
  const userAge= new Date().getFullYear() - logedUserdateOfBirth?.split('-').at(-1);

  return (
    <>
      <div className="    flex flex-wrap items-center  justify-center mb-10  ">
        <div className="w-sm  md:w-2xl container rounded-2xl max-w-md  md:max-w-2xl w-full bg-white  shadow-lg    transform   duration-200 easy-in-out">
          
          <div className="flex justify-center px-5  ">
            <img className="h-32 w-32 bg-white p-2 rounded-full   " src={logedUserPhoto} alt />
          </div>
          <div className=" ">
            <div className="text-center px-14">
              <h2 className="text-gray-800 text-3xl font-bold">{logedUserName}</h2>
              <a className="text-gray-400 mt-2 hover:text-blue-500" href={` mailto:${logedUserEmail} `} target="_blank">{logedUserEmail?.split("@").at(0)}</a>
              <p className="mt-2 text-gray-500 text-sm">Hello i'm {logedUserName} and i'm {userAge} years old</p>
            </div>
            <hr className="mt-6" />
            <div className="flex  bg-gray-50 ">
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <p><span className="font-semibold">2.5 k </span> Followers</p>
              </div>
              <div className="border" />
              <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                <p> <span className="font-semibold">{postsNum} </span> Posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
