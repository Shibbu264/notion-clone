import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';



const prisma=new PrismaClient()
export async function POST(req:Request){

    const body=await req.json()
    const noteid=body.noteid??""

    try{
      const user=await prisma.user.findUnique({where:{
        id:body.userid??""
      }})
     
await prisma.post.upsert(
  {create:{
    id:noteid,
    title:"",
    content:"Hello Guys!",
    authorId:user?.id??"",
    categories:""
     
   },
 
  update:{
 
  },
  where:{
    id:noteid,
  },

 

  }
)
const post =await prisma.post.findUnique({
  where:{
    id:noteid
  }
})
console.log(post)
return NextResponse.json({post:post})

    }
    catch (e){
console.log(e)
return NextResponse.json(
  {error:e}
)

    }








  }