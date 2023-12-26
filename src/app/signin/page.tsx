'use client'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Signin() {
  const { data: session,status } = useSession()
  if(status=="unauthenticated")
return (
  
    <div className='my-12 text-3xl text-center'>
      Not signed in <br />
      <button className='my-6 bg-white text-blue-500 hover:text-white hover:bg-blue-500 px-2 py-2 rounded-xl' onClick={() => signIn("",{callbackUrl:'http://localhost:3000/welcome'})}>Sign in</button>
    </div>
)
else if(status=="authenticated"){
  window.location.replace("/")
}
}
