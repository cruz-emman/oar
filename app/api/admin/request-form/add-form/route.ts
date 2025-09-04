import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {


    try {
        const body = await req.json()
        const { request, date_request, due_date, date_printed, date_approved, date_checked, remarks, id } = body

        

        const newRequest = await db.requestForm.create({
            data: {
                studentUser: id,
                request,
                date_request,
                due_date,
                date_printed,
                date_approved,
                date_checked,
                remarks
            }
        })


        return NextResponse.json(newRequest, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }

} 