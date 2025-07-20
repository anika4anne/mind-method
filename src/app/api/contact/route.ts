import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, grade, subject, message } = await request.json();

    // Validate required fields
    if (!name || !grade || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from Mind & Method Website:

Name: ${name}
Grade: ${grade}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Mind & Method contact form.
    `;

    // Email data
    const emailData = {
      from: "contact@mindnmethod.com",
      to: "anikaanne2010pal@gmail.com",
      subject: `Mind & Method Contact: ${subject}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    };

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send(emailData);

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 },
        );
      }

      console.log("📧 Email sent successfully:", data);
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 },
      );
    } catch (resendError) {
      console.error("Resend API error:", resendError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
