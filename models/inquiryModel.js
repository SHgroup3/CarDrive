const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    }, 
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "closed"],
      default: "new",
    }, 
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
); 

module.exports = mongoose.model("Inquiry", InquirySchema);
