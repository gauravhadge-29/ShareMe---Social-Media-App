import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
      < Circles
        color="#00BFFF"
        height="80"
        width="80"
        className='m-5'
      />

      <p className='text-lg text-center px-2 m-3'>{message}</p>
    </div>
  )
}

export default Spinner
