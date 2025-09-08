import React, { useEffect, useState } from 'react'
import './Home.css'
import PostCard from '../PostCard/PostCard'
import axios from 'axios'
import LoadingPage from '../LoadingPage/LoadingPage'
import { useQuery } from '@tanstack/react-query';
import CreatePost from '../CreatePost/CreatePost'
export default function Home() {



  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts`, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
  }
  const { isLoading, data } = useQuery({
    queryKey: ['allposts'],
    queryFn: getAllPosts,
  })
  
  if (isLoading) {
    return <LoadingPage />
  }

  const allPosts = structuredClone(data.data.posts).reverse();

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
        <div className=" py-20">
          <CreatePost />
          {allPosts && allPosts.map(post => (<PostCard post={post} key={post.id} isSinglePage={false} />))}
        </div>
      </div>
    </>
  )
}
