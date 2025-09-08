import React, { useRef, useState } from 'react'
import './PostCard.css'
import { Link } from 'react-router-dom';
import PostHeader from './../PostHeader/PostHeader';
import CommentCard from '../CommentCard/CommentCard';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from '../../Contexts/AuthContextProvider';
export default function PostCard({ post, isSinglePage }) {
  const [commentValue, setcommentValue] = useState('')
  const userName = post.user.name;
  const userImg = post.user.photo;
  const PostImg = post.image;
  const PostCaption = post.body;
  const commentLength = post.comments.length;
  const firstComment = post.comments?.at(-1); // latest Comment
  const queryClient = useQueryClient()
  const allCommentsReversed = structuredClone(post.comments).reverse();
  const createdAt = post.createdAt.split("T")?.[0]
  const userId = post.user._id
  const likesCouner = useRef(Math.floor(Math.random()*100))
  const {logedUserPhoto}=useContext(authContext)
  function hadleAddComment() {
    const commentData = {
      content: commentValue,
      post: post.id
    }
    return axios.post('https://linked-posts.routemisr.com/comments', commentData, {
      headers: { token: localStorage.getItem('tkn') }
    })
  }

  const {mutate: handelCommentMut,isPending ,data}=useMutation({
    mutationFn: hadleAddComment,

    onSuccess: function(res){
      setcommentValue('')
      queryClient.invalidateQueries(['singlePost', post.id]),
      toast.success('Comment Added')
    },
    onError:function(err){
      console.log(err.response.data.error.split('"').at(-1) ),
      toast.error(err.response.data.error.split('"').at(-1))
    }
  })
  return (
    <>
      <section className="  flex items-center justify-center  p-4">
        <div className="bg-white dark:bg-gray-900  dark:bg-opacity-50	 rounded-lg shadow-sm max-w-md  md:max-w-2xl w-full insta-border ">
          {/* Post Header */}
          <div className="p-3">
            <PostHeader isPost idToDeleteCard={post.id} userName={userName} userImg={userImg} createdAt={createdAt} isHeader userId={userId}/>
          </div>
          {/* Post Image */}
          <div>
            {PostImg && <img className="w-full object-cover " src={PostImg} alt={PostCaption} />}
          </div>
          {/* Post Actions */}
          <div className="flex justify-between items-center p-4">
            <div className="flex space-x-4">
              <button aria-label="Like post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              <button aria-label="Comment on post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z" /></svg>
              </button>
            </div>
            <button aria-label="Save post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            </button>
          </div>
          {/* Likes Count */}
          <div className="px-4 pb-2">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {likesCouner.current} likes
            </p>
          </div>
          {/* Caption */}
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-900 dark:text-gray-100 break-words whitespace-normal ">
              <Link to="/profile" className="font-semibold hover:underline me-2">{userName}</Link>
              {PostCaption}
            </p>
          </div>
          {/* View Comments */}
          <div className="px-4 pb-2">
            {!isSinglePage &&
              <Link to={`/posts/${post.id}`} className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:underline">
                View all {commentLength} comments
              </Link>
            }
          </div>
          {/* Add Comment */}
          <div className="px-4 pb-4 border-t insta-border mt-2 pt-3 ">
            {!isSinglePage && firstComment && <CommentCard firstComment={firstComment} />}
            {isSinglePage && allCommentsReversed?.map(comment => <CommentCard key={comment._id} firstComment={comment} />)}
            <div className="flex items-center space-x-3 mt-3 p-3 border-t-2 dark:border-gray-50/30 border-gray-300">
              <img className="w-7 h-7 rounded-full object-cover" src={logedUserPhoto} alt="Your Avatar" />
              <input value={commentValue} onChange={(e) => { setcommentValue(e.target.value) }} className="text-lg text-gray-900 dark:text-white flex-grow focus-visible:outline-0  " placeholder='Add a comment...' />
              <button onClick={handelCommentMut} disabled={isPending} className={`text-sm font-semibold text-blue-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400 opacity-50  ${isPending ? 'cursor-not-allowed' : ' cursor-pointer '} `}>Post</button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
