import { db } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";



export async function GET(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        // Await params before using it
        const { studentId } = await params;

        const student = await db.student.findFirst({
            where: {
                id: studentId
            },
            include: {
                requestForm: true
            }
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        const { requestForm } = student;
        return NextResponse.json(requestForm, { status: 200 });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}