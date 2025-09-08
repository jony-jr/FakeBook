import React from 'react'
import './PostDetails.css'
import { useParams } from 'react-router-dom'
import PostCard from './../PostCard/PostCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../LoadingPage/LoadingPage';
export default function PostDetails() {
  const { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
  }
  const { isLoading, data } = useQuery({
    queryKey: ['singlePost', id],
    queryFn: getSinglePost,
    
  })

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
        <div className=" py-20">
          <PostCard post={data.data.post} isSinglePage/>
        </div>
      </div>
    </>
  )
}
