import { NextResponse } from "next/server";
import mongoose from "mongoose";
import  ButtonClick  from "@/models/ButtonClick";
import  PageView  from "@/models/PageView";
import  connect  from "@/lib/mongodb";
// Optional: If you have a form submission model, import it. Otherwise, count from your leads collection.
// Update the import path to match the actual file name and location, e.g.:
import InvestorLead from "@/models/investorLead";

export async function GET() {
  await connect();
  // Count button clicks
  const buttonClicks = await ButtonClick.countDocuments();
  // Count page views
  const pageViews = await PageView.countDocuments();
  // Count form submissions (assuming InvestorLead is your form submission model)
  let formSubmissions = 0;
  try {
    formSubmissions = await InvestorLead.countDocuments();
  } catch (e) {
    // If model doesn't exist, fallback to 0
    formSubmissions = 0;
  }

  return NextResponse.json({
    buttonClicks,
    pageViews,
    formSubmissions,
  });
}
