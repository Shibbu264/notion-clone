"use client"
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

export default function(){
    const [socket, setsocket] = useState<Socket | null>(null)
    const socketInitializer = async () => {
        await fetch('/api/socket')
        const connection = io()
      console.log(connection)
       setsocket(connection)
      }
      socket?.on('connect',async () =>{
        console.log('connected')
       })
    //   useEffect(()=>{socketInitializer()},[])
    return<h1>hello</h1>
}