import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { create } from 'domain';
import type { NextApiRequest, NextApiResponse } from 'next';

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export  async function POST(
    req: Request
    
  ) : Promise <any> {
    const body =await req.json();
     
      try {
       
        const user = await  prisma.user.findUnique({
            where: {
              id:body.email,
            },
            include: {
              posts: true,
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
  
  