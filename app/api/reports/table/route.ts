import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const { searchParams } = new URL(req.url);
        const from = searchParams.get("from"); 
        const to = searchParams.get("to")

        
        
        const data = await db.requestForm.findMany({
            where: {
                updatedAt: {
                    gte: from ? new Date(from) : undefined,
                    lte: to ? new Date(to) : undefined
                }
            },
            include: {
                studentId: {
                    select: {
                        studentNumber: true,
                        first_name: true,
                        last_name: true,
                    
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}