import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PageView || mongoose.model("PageView", PageViewSchema);
