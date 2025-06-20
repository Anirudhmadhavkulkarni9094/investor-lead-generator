import { NextRequest } from "next/server";
import connect from "@/lib/mongodb";
import InvestorLead from "@/models/investorLead";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    console.log("Received body:", body);

    const {
      name,
      email,
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
      additionalInfo,
    } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        { status: 400 }
      );
    }

    const lead = await InvestorLead.create({
      name,
      email,
      phone,
      investorType,
      geography,
      industry,
      stage,
      investmentSize,
      status,
      additionalInfo,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin Notification
    const mailOptionsAdmin = {
      from: `"Lead Generator" <capitaldirectories@gmail.com>`,
      to: "capitaldirectories@gmail.com",
      subject: "🚀 New Investor Lead Request Submitted",
      text: `
New submission received:

Name: ${name}
Email: ${email}
Phone: ${phone}

Investor Type: ${investorType?.join(", ")}
Geography: ${geography?.join(", ")}
Industry: ${industry?.join(", ")}
Stage: ${stage?.join(", ")}
Investment Size: ${investmentSize?.join(", ")}
Status: ${status?.join(", ")}

Additional Info:
${additionalInfo || "N/A"}

Submitted at: ${new Date().toLocaleString()}
      `,
    };
    await transporter.sendMail(mailOptionsAdmin);

    // PDF Attachment Email to User
    const pdfPath = path.join(process.cwd(), "public", "samplelead.xlsx");
    const pdfBuffer = fs.readFileSync(pdfPath);

    const mailOptionsUser = {
      from: `"Investor Directory" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📄 Your Investor Guide PDF",
      text: `Hi ${name},

Thank you for submitting your investor preferences.

Attached is your free investor guide PDF. We'll be in touch soon!

Best regards,  
CapitalDirectories Team`,
      attachments: [
        {
          filename: "InvestorGuide.xlsx",
          content: pdfBuffer,
          contentType: "application/xlsx",
        },
      ],
    };
    await transporter.sendMail(mailOptionsUser);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead submitted and emails sent successfully.",
        lead,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing investor lead:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

