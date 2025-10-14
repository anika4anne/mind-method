import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { GoogleSpreadsheet } from "google-spreadsheet";

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
    if (existing) {
      return NextResponse.json(
        { message: "Already subscribed." },
        { status: 200 },
      );
    }
    await prisma.subscriber.create({ data: { email } });

    // Save to Google Sheet
    try {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!);

      await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      });

      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      if (sheet) {
        await sheet.addRow({
          email: email,
          subscribedAt: new Date().toISOString(),
          source: "website",
        });
      }
    } catch (sheetError) {
      console.error("Google Sheets error:", sheetError);
      // Don't fail the entire request if Google Sheets fails
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
    await transporter.sendMail({
      from: "mindmethodjjhs@gmail.com",
      to: email,
      subject: "🎉 You're Subscribed to Mind & Method! 🎉",
      html: `
        <div style="background: linear-gradient(135deg, #67e8f9 0%, #a7f3d0 100%); padding: 2rem; border-radius: 1.5rem; text-align: center; font-family: 'Segoe UI', 'Arial', sans-serif; color: #0e7490;">
          <div style="position: relative; height: 80px;">
            <div style="position: absolute; left: 50%; top: 0; transform: translateX(-50%); width: 100px; height: 80px; pointer-events: none;">
              <div style="animation: confetti 1.5s linear infinite alternate; position: absolute; left: 10px; top: 10px; font-size: 2rem;">🎊</div>
              <div style="animation: confetti 1.2s linear infinite alternate-reverse; position: absolute; left: 60px; top: 20px; font-size: 2rem;">🎉</div>
              <div style="animation: confetti 1.8s linear infinite alternate; position: absolute; left: 30px; top: 40px; font-size: 2rem;">✨</div>
            </div>
          </div>
          <h1 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Welcome to Mind & Method!</h1>
          <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">You've <b>successfully subscribed</b> to updates. Get ready for psychology news, club events, and more!</p>
          <div style="margin: 1.5rem 0;">
            <a href="https://mind-method.vercel.app/" style="display: inline-block; background: linear-gradient(90deg, #06b6d4, #14b8a6); color: white; font-weight: bold; padding: 0.75rem 2rem; border-radius: 999px; text-decoration: none; font-size: 1.1rem; box-shadow: 0 4px 24px rgba(6,182,212,0.15); transition: background 0.3s;">Visit Mind & Method</a>
          </div>
          <p style="font-size: 0.95rem; color: #155e75;">If you didn't subscribe, you can <a href="https://mind-method.vercel.app/unsubscribe?email=${encodeURIComponent(email)}" style="color: #ef4444; text-decoration: underline;">unsubscribe here</a>.</p>
          <style>
            @keyframes confetti {
              0% { transform: translateY(0) rotate(0deg); }
              100% { transform: translateY(30px) rotate(20deg); }
            }
          </style>
        </div>
      `,
      text: `Welcome to Mind & Method!\n\nYou've successfully subscribed to updates. If you didn't subscribe, you can unsubscribe at https://mind-method.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`,
    });

    return NextResponse.json(
      { message: "Subscribed successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
