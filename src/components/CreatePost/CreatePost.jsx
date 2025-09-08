import React, { useRef, useState } from 'react'
import './CreatePost.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import PulseLoader from './../../../node_modules/react-spinners/esm/PulseLoader';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [changeCounter, setchangeCounter] = useState(0)
  const [imgPreview, setImgPreview] = useState(null)
  const isImgPreview = !!imgPreview;
  let imgAlt = '';
  const imgInput = useRef(null)
  const captionInput = useRef(null)
  const queruClient=useQueryClient()
  
  function handleOpenModel() {
    setIsModalOpen(true)
  }
  function handleCloseModel() {
    setIsModalOpen(false)
    handleClearImgPrev()
  }
  function hadleCounter(e) {
    setchangeCounter(e.target.value.length)
  }
  function handleImgChange() {
    imgAlt = imgInput.current.files?.[0].name;
    const url = URL.createObjectURL(imgInput.current.files?.[0])
    setImgPreview(url);
  }
  function handleClearImgPrev() {
    setImgPreview(null)
    imgInput.current.value = '';
  }
  function handleCreatPost() {
    const formDataObj = new FormData()
    if (captionInput.current.value) {
      formDataObj.append("body", captionInput.current.value)
    }
    if (imgPreview) {
      formDataObj.append('image', imgInput.current.files?.[0])
    }
    return axios.post('https://linked-posts.routemisr.com/posts', formDataObj, {
      headers: { token: localStorage.getItem('tkn') }
    })
  }
  const {mutate:handleSendPost ,isPending} =useMutation({
    mutationFn: handleCreatPost,
    onSuccess: function(res){
      console.log("🚀 ~ CreatePost ~ res:", res)
      handleCloseModel();
      queruClient.invalidateQueries(['allposts']);
      toast.success('Post Created Successfully',{
        autoClose:1000
      })
    }
  })
  return (
    <>
      {/* component */}
      <div className="editor rounded-sm mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl dark:border-gray-800">
        <div className="toggler">
          {!isModalOpen && <input onClick={handleOpenModel} className="w-full rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none dark:bg-[#EBE8E2]" spellCheck="false" placeholder="What's in your mind?" type="text" />}        </div>
        {isModalOpen &&
          <div className="main-comp">
            <textarea ref={captionInput} onChange={hadleCounter} autoFocus className="dark:bg-[#EBE8E2] rounded-lg w-full description bg-gray-100 sec p-3 min-h-20 border max-h-35 border-gray-300 outline-none" spellCheck="false" maxLength={300} placeholder="Describe everything about this post here" defaultValue={""} />
            {isImgPreview &&
              <div className="relative">
                <img src={imgPreview} alt={imgAlt} className=' w-full md:max-h-90 mx-auto mt-3 rounded-sm' />
                <IoIosCloseCircleOutline onClick={handleClearImgPrev} size={22} className="absolute top-2 right-2 cursor-pointer hover:text-red-900" />
              </div>
            }
            {/* icons */}
            <div className="icons flex text-gray-500 m-2">
              <label>
                <input ref={imgInput} onChange={handleImgChange} type="file" className='hidden' />
                <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 dark:text-white dark:hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </label>
              <div className="count ml-auto text-gray-400 text-xs font-semibold">{changeCounter}/300</div>
            </div>
            {/* buttons */}
            <div className="flex">
              <button type='button' onClick={handleCloseModel} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 dark:text-white dark:border-gray-500 ml-auto">Cancel</button>
              <button type='button' onClick={handleSendPost} className="border border-[#2563eb] p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-[#2563eb]">
                {isPending ? <PulseLoader size={5} className='w-8 block mx-auto  text-center cursor-not-allowed' color="white" /> : 'post'}
              </button>
            </div>
          </div>
        }
      </div>

    </>
  )
}
