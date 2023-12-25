import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export  async function POST(
    req: NextApiRequest
    
  ) : Promise <any> {
     console.log(req.body)
      try {
       
        const user = await  prisma.user.findUnique({
            where: {
              id: 'shivanshu.ranjan.che22@itbhu.ac.in',
            },
          });
         
        return NextResponse.json({user});
       
      } catch (error) {
        
      return NextResponse.json(
        { message: error },
        { status: 503 },
      );
      }

    }
  