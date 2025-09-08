import React from 'react'
import PostHeader from '../PostHeader/PostHeader'
export default function CommentCard({ firstComment }) {  
  return (
    <>
      {
        firstComment.content &&
        <>
          <section className=' pb-3'>
            <PostHeader idToDeleteCard={firstComment._id} userName={firstComment.commentCreator.name} userImg={firstComment.commentCreator.photo} userId={firstComment.commentCreator._id} />
            <p className='dark:text-white text-black  ms-12 '>{firstComment.content}</p>
          </section>
        </>
      }
    </>
  )
}
