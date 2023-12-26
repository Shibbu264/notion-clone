"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from 'next-auth/react';
import { stat } from "fs";
export default function Note({params}:{params:{noteid:string}}){
const { data: session,status} = useSession() 
const isAuthActionTaken = useRef(false);

const noteid1=params.noteid
const [Noteidaftersaving,setnoteid]=useState("")
async function savenotes(noteid:string) {
  
    const response = await fetch("/api/notesave",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({noteid:noteid,userid:session?.user?.email})})
        const data=await response.json()
        console.log(data)
setnoteid(data.post.id)
}    
    
useEffect(
  ()=>{
    
if(status=="authenticated" )
 {  savenotes(noteid1)
   console.log("inside-effect")}
isAuthActionTaken.current=true
  }   
    ,[status])




return(
<div>

<h1 className="flex justify-center my-6 text-4xl">Welcome to new notes! with noteID: {Noteidaftersaving} </h1>



</div>






)













}