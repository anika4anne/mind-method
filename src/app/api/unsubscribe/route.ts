import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (!existing) {
      return NextResponse.json(
        { message: "Email not found." },
        { status: 404 },
      );
    }
    await prisma.subscriber.delete({ where: { email } });
    return NextResponse.json(
      { message: "Unsubscribed successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
