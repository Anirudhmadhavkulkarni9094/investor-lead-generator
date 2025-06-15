import { NextRequest } from "next/server";
import connect from "@/lib/mongodb";
import InvestorLead from "@/models/investorLead";
import nodemailer from "nodemailer";

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

    // Basic validation
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        {
          status: 400,
        }
      );
    }

    // Save to DB
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
      service: "gmail", // or "Zoho", "Outlook", etc.
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    const mailOptions = {
      from: `"Lead Generator" <${process.env.EMAIL_USER}>`,
      to: "capitaldirectories@gmail.com", // or multiple recipients
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
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead submitted successfully",
        lead,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing investor lead:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
