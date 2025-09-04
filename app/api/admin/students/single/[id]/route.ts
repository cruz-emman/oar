import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params before using it
        const { id } = await params;

        const student = await db.student.findFirst({
            where: {
                id: id
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

        return NextResponse.json(student, { status: 200 });
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params before using it
        const { id } = await params;
        const body = await req.json();

        const student = await db.student.findUnique({
            where: {id: id}
        })

        if(!student){
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }
            

        const updatedStudent = await db.student.update({
            where: { id: id },
            data: body,
        });

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}   

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const student = await db.student.findUnique({
            where: { id: id }
        });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        await db.student.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}