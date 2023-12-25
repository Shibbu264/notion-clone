import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home1() {
  const { data: session,status} = useSession()
if(status=="loading") return <div className='my-12 text-3xl text-red-400 font-bold text-center'>Loading...</div>
else{  if (session) {
    return (
      <div className='my-12 text-3xl text-center'>
        Signed in as {session.user?.name} <br />
        <button className='my-6 bg-white text-blue-500 hover:text-white hover:bg-blue-500 px-2 py-2 rounded-xl' onClick={() => signOut().then(()=>{window.location.replace("/signin")})}>Sign out</button>
      </div>
    )
  }
  else{
    window.location.replace("/signin")
  }
}}
