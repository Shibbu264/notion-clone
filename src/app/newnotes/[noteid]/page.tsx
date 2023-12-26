"use client"
import { useEffect, useRef, useState } from "react"
import { useSession } from 'next-auth/react';
import { stat } from "fs";
export default function Note({params}:{params:{noteid:string}}){
const { data: session,status} = useSession() 
const[title,settitle]=useState("Title")
const [content,setContent]=useState("")
const [spacecounter,setspace]=useState(false)


const noteid1=params.noteid
const [Noteidaftersaving,setnoteid]=useState("")
async function savenotes(noteid:string) {
  
    const response = await fetch("/api/notesave",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({noteid:noteid,userid:session?.user?.email
        
        })})
        const data=await response.json()
        console.log(data)
setnoteid(data.post.id)
settitle(data.post.title)
setContent(data.post.content)
}    
    
useEffect(
  ()=>{
    
if(status=="authenticated" )
 {  savenotes(noteid1)
   console.log("inside-effect")}
setspace(false)
  }   
    ,[status])

async function savedata(){
    
    await fetch("/api/savedata",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({noteid:noteid1,userid:session?.user?.email
        ,title:title,content:content
        })})
        console.log("data saved!")
        
}


return(
<div>

<h1 className="flex justify-center my-6 text-4xl">Welcome to new notes! with noteID: {Noteidaftersaving} </h1>

<div className="flex flex-col items-center gap-5  justify-center">
    <input value={title} onChange={(e)=>{
        const value=e.target.value
      
       savedata()
      
        settitle(e.target.value)}}  className="block px-2 text-4xl placeholder:text-white border-0 focus:border-none text-center text-white bg-black min-w-72 h-fit min-h-16 w-fit" type="text" ></input>
<textarea value={content} onChange={(e)=>{ const value=e.target.value;  if (value[value.length - 1] === ' '||value[value.length - 1] === '.') {
   savedata()
  }setContent(e.target.value)}} id="message" className="h-fit p-2.5 min-w-[80%] sm:min-h-[500px] w-fit font-semibold  text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
</div>

</div>






)













}