import React, { useContext } from 'react'
import './PostHeader.css'
import USER_NOT_FOUND from '../../../src/assets/Images/notFound.png'
import { Dropdown, DropdownItem } from "flowbite-react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { authContext } from '../../Contexts/AuthContextProvider';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


export default function PostHeader({ userName, userImg, createdAt, isHeader = false, userId, isPost = false, idToDeleteCard }) {
  const { logedUserId } = useContext(authContext)
  function deletePosCom() {
    return axios.delete(`https://linked-posts.routemisr.com/${isPost ? "posts" : "comments"}/${idToDeleteCard}`, {
      headers: { token: localStorage.getItem('tkn') }
    })
  }
  const queryClient = useQueryClient()

  const { isPending, mutate: handleDeleteProcess } = useMutation({
    mutationFn: deletePosCom,
    onSuccess: function (res) {
      queryClient.invalidateQueries(['userPosts', logedUserId]),
      console.log(res);
        toast.success(`${isPost ? 'Post deleted successfully': 'Comment deleted successfully'}`,{
          autoClose:1000
        })
    },
    onError: function(rej){
      toast.error(rej.response.data.message)
    }
  })  
  return (
    <>
      <div className="flex items-center justify-between insta-border">
        <div className="flex items-start space-x-3">
          <img onError={(e) => { e.target.src = USER_NOT_FOUND }} className="w-8 h-8 rounded-full object-cover" src={userImg} alt={userName} />
          <div className="flex flex-col gap-1 ">
            <span className=" text-sm font-semibold text-gray-900 dark:text-gray-100">{userName}</span>
            {isHeader && <p className='text-sm font-semibold text-gray-500'>{createdAt}</p>}
          </div>
        </div>
        {logedUserId === userId &&
          <Dropdown label={<HiDotsHorizontal size={22} className="cursor-pointer" />} arrowIcon={false} className='w-fit p-0  me-2 utline-0  text-black dark:text-gray-300 dark: dark:border-gray-800 focus:ring-0   ' >
            <DropdownItem onClick={handleDeleteProcess} icon={MdDelete}>Delete</DropdownItem>
            <DropdownItem icon={MdUpdate}>Update</DropdownItem>
          </Dropdown>
        }
      </div>
    </>
  )
}
