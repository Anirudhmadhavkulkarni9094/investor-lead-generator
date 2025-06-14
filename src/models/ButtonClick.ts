import mongoose from "mongoose";

const ButtonClickSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ButtonClick || mongoose.model("ButtonClick", ButtonClickSchema);
