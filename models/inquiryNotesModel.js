const mongoose = require("mongoose");

const InquiryNoteSchema = new mongoose.Schema(
  {
    inquiry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
      required: true,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
);

module.exports = mongoose.model("InquiryNote", InquiryNoteSchema);
