"use client";

import { Avatar } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const Logout = () =>{
        router.push('/');
    }
  return (
        <div className='w-40 h-screen fixed bg-gradient-to-b from-[#323232] via-[#323232] to-[#323232]'>
            <div className='w-full h-full flex flex-col justify-between items-center gap-10 p-10 '>
                <div className=''>
                    <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-[#9aea30]/90 shadow-lg shadow-orange-500/40" />
                    <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#9aea30]">
                        Morocco 
                    </span>
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#9aea30]">With You</span>
                    <span className="text-xs text-slate-300">Morocco </span>
                    <span className="text-xs text-slate-300">Experiences</span>
                    </div>
                    </div>
                </div>
                <div className='h-1/2 flex flex-col justify-around'>

                <div className='cursor-pointer left-0'>
                    <Link href="/Dashboard">Dashboard</Link>
                </div>
                {/* <div className='cursor-pointer left-0'>
                    <Link href="/Dashboard/Chat">Chat</Link>
                </div> */}
                <div className='cursor-pointer left-0'>
                    <Link href="/Dashboard/Settings">Settings</Link>
                </div>
                <div className='cursor-pointer left-0'>
                    <Link href="/Dashboard/History">History</Link>
                </div>
               </div> 
                <div className='flex items-center gap-2 ' onClick={Logout}>
                    <Avatar className='w-10 h-10 '></Avatar>
                    <p>Profile</p>
                </div>
            </div>
        </div>
  )
}