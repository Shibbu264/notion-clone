
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';



const prisma=new PrismaClient()
export async function POST(req:Request){

    const body=await req.json()
    const noteid=body.noteid??""

    try{
      
     
await prisma.post.delete({
    where:{
        id:noteid
    }
})



return NextResponse.json({message:"Succesfully Deleted!"})

    }
    catch (e){
console.log(e)
return NextResponse.json(
  {error:e}
)

    }








  }
