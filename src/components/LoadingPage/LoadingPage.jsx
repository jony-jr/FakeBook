import React from 'react'
import PropagateLoader from './../../../node_modules/react-spinners/esm/PropagateLoader';

export default function LoadingPage() {
  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-700'>
      <PropagateLoader color='blue'  size={30} className='-translate-5 '/>
    </section>
  )
}
