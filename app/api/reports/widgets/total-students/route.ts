import { db } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const totalStudents = await db.student.count();
        return NextResponse.json(totalStudents, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch total students" }, { status: 500 });
    }
}