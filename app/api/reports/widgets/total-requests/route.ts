import { db } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const totalRequest = await db.requestForm.count();
        return NextResponse.json(totalRequest, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch total request" }, { status: 500 });
    }
}