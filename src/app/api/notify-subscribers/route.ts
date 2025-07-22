import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { subject, message } = await request.json();
    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required." },
        { status: 400 },
      );
    }
    const subscribers = await prisma.subscriber.findMany();
    if (!subscribers.length) {
      return NextResponse.json(
        { message: "No subscribers to notify." },
        { status: 200 },
      );
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    for (const sub of subscribers) {
      const unsubscribeUrl = `https://mind-method.vercel.app/unsubscribe?email=${encodeURIComponent(sub.email)}`;
      await transporter.sendMail({
        from: "mindmethodjjhs@gmail.com",
        to: sub.email,
        subject,
        html: `
          <div>
            <p>${message}</p>
            <hr />
            <p style="font-size:0.9em;">If you no longer want updates, <a href="${unsubscribeUrl}">unsubscribe here</a>.</p>
          </div>
        `,
        text: `${message}\n\nUnsubscribe: ${unsubscribeUrl}`,
      });
    }
    return NextResponse.json(
      { message: "Notification sent to all subscribers." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Notify subscribers error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
