import { NextApiResponseServerIo } from '@/lib/type';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { NextApiRequest } from 'next';


export function GET(req:NextApiRequest,res:NextApiResponseServerIo){
  
  if (!res.socket.server.io) {
    const path = '/api/socket';
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });
    io.on('connection', (s) => {
     console.log("socet is running",s.id)
    });
    res.socket.server.io = io;
  }
  else{
    console.log("Socket is already running")
  }
 
return Response.json({"je":"x"})
}