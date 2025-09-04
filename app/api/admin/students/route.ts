import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NewStudentSchema } from "@/utils/zod";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextResponse, res: NextResponse) {
    try {

        const students = await db.student.findMany({
            orderBy: {
                updatedAt: "desc"
            }
        })

        return NextResponse.json(students)
    } catch (error) {
        return NextResponse.json("GoodBye")
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const result = NewStudentSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json(
            { error: "Validation failed", issues: result.error.issues },
            { status: 400 }
        );
    }
    try {

        const { studentNumber,
            first_name,
            middle_name,
            last_name,
            college
        } = result.data


        const existingStudent = await db.student.findUnique({
            where: {
                studentNumber: studentNumber
            }
        })

        if(existingStudent) {
            return NextResponse.json(
                {message: "Student already exists"},
                {status: 409}
            )
        }

        const newStudent = await db.student.create({
            data: {
                studentNumber,
                first_name,
                middle_name,
                last_name,
                college
            }
        })


         return NextResponse.json(newStudent, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}