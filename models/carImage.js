const mongoose = require("mongoose");

const CarImageSchema = new mongoose.Schema(
  {
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    image_url: { type: String, required: true },
    is_primary: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
);

module.exports = mongoose.model("CarImage", CarImageSchema);
