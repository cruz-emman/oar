import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
    try {
        const { id } = await params;
        const request = await db.requestForm.findUnique({
            where: {
                id: id
            }
        });

        if (!request) {
            return NextResponse.json(
                { error: 'Request not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(request, { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params
    const body = await req.json()

    // Add this debugging line
    console.log('Received PATCH data:', body);
    console.log('date_request:', body.date_request);
    console.log('due_date:', body.due_date);

    const request = await db.requestForm.findUnique({
      where: { id: id },
    })

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    const updateRequestForm = await db.requestForm.update({
      where: { id: id },
      data: body,
    })

    return NextResponse.json(updateRequestForm, { status: 200 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
export async function DELETE(req: NextRequest, { params }: Props) {
    try {
        const { id } = await params;
        await db.requestForm.delete({
            where: { id: id }
        });
        return NextResponse.json({ message: 'Request deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}