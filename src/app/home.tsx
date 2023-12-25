import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { POST } from './api/auth/[...nextauth]/route';
import { json } from 'stream/consumers';

const prisma = new PrismaClient();
export default function Home1() {
  const { data: session,status} = useSession()
  const [user,setUser]=useState<{ profilepic?: string } | null>(null);
  
  useEffect(() => {
    async function fetchuserdata (email:string){
     
      const response = await fetch("/api/userdata",{
           method:'POST',
     
           headers: {
             'Content-Type': 'application/json',
           },
     
           body:JSON.stringify({email})})
     
           const data =await response.json()
         
           setUser(data.user)
         }
    if (status === "authenticated") {
      const email =session?.user?.email
    fetchuserdata(email??"")

  }
 
  }, [status, session?.user?.email]);

 

if(status=="loading") return <div className='my-12 text-3xl text-red-400 font-bold text-center'>Loading...</div>
else{  if (session) {
    return (
      <div className=' text-3xl  '>
{user?.profilepic && (
  <div className='flex justify-start flex-col'>
  <img className='my-3 block ml-[2%]  w-16 h-16 rounded-full p-3 border-2 border-white ' src={user.profilepic}/>
  <h1 className='my-4 ml-[2%]'> {session.user?.name} </h1>
  </div>
)}
       <br />

        <button className='mt-6 block mx-auto bg-white text-blue-500 hover:text-white hover:bg-green-500 px-2 py-2 rounded-xl' >Create notes!</button>

        <button className='mt-[25%] mx-auto block bg-white text-blue-500 hover:text-white hover:bg-blue-500 px-2 py-2 rounded-xl' onClick={() => signOut().then(()=>{window.location.replace("/signin")})}>Sign out</button>
      </div>
    )
  }
  else{
    window.location.replace("/signin")
  }
}}
