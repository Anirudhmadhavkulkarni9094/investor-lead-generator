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
   const pendingRequest = await InvestorLead.find({requestCompleted : false});
    const completedRequest = await InvestorLead.find({requestCompleted : true});
  
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
    pendingRequest,
    completedRequest
  });
}


export async function PUT(request: Request) {
  await connect();
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const updatedLead = await InvestorLead.findByIdAndUpdate(
      id,
      { requestCompleted: true },
      { new: true }
    );
    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, updatedLead });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}