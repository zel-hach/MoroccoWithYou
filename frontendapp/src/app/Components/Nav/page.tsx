import { Avatar } from '@mantine/core'
import React from 'react'

export default function Nav() {
  return (
    <div className='w-full ml-40 flex justify-start items-center p-4 bg-white text-black  fixed  '>
        <div className='space-x-2'>
            <input type='text' placeholder='Search' className='rounded p-2 bg-inherit text-black border-2 border-secondryColor outline-none focus:placeholder-gray-500  focus:placeholder-opacity-0 peer'></input>
            <button className='rounded p-2 bg-inherit text-black border-2 border-secondryColor outline-none focus:placeholder-gray-500  focus:placeholder-opacity-0 peer'>Search</button>
        </div>
        {/* <div className='flex items-center gap-2 ' >
            <Avatar className='w-10 h-10 '></Avatar>
            <p>Profile</p>
        </div> */}
    </div>
  )
}