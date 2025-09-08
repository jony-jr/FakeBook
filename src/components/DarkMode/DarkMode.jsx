import React, { useEffect, useState } from 'react'
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
export default function DarkMode() {
  const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
      })
  function darkToggeler() {
    setIsDark(!isDark)
  }
  useEffect(() => {
    localStorage.setItem('darkMode', isDark)
    if (isDark) {
      document.documentElement.classList.add('dark');
      
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  return (
    <>
      <button type="button" className=' cursor-pointer ' onClick={darkToggeler}> {isDark ? <MdOutlineLightMode className='text-white' /> : <MdOutlineNightlight className='text-blue-900' />} </button>
    </>
  )
}
