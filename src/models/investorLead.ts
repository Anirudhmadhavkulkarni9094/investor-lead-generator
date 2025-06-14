import mongoose, { Schema, model, models } from "mongoose";

const InvestorLeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  investorType: [{ type: String }],
  geography: [{ type: String }],
  industry: [{ type: String }],
  stage: [{ type: String }],
  investmentSize: [{ type: String }],
  status: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  requestCompleted: { type: Boolean, default: false },
  additionalInfo: { type: String, default: "" },
});

const InvestorLead = models.InvestorLead || model("InvestorLead", InvestorLeadSchema);

export default InvestorLead;
