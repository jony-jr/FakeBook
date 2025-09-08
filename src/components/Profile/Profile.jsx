import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import LoadingPage from '../LoadingPage/LoadingPage'
import PostCard from '../PostCard/PostCard'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { authContext } from '../../Contexts/AuthContextProvider'
import CreatePost from '../CreatePost/CreatePost'
import UserInfoCard from './../UserInfoCard/UserInfoCard';
export default function Profile() {
  const {logedUserId} = useContext(authContext)
  function getAllUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/689b5a2efcf033c8b81aee15/posts`, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
  }
  const {data , isLoading,isError}=useQuery({
    queryKey:['userPosts',logedUserId],
    queryFn: getAllUserPosts,
    
  })
  
  if (isLoading) {
      return <LoadingPage />
    }
  if (isError) {
      return <h2>Error hapend</h2>
    }

  const allUserPosts = structuredClone(data.data.posts).reverse();
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
        <div className=" py-20">
          <UserInfoCard/>
          <CreatePost/>
          {allUserPosts && allUserPosts.map(post => (<PostCard post={post} key={post.id} />))}
        </div>
      </div>
    </>
  )
}
