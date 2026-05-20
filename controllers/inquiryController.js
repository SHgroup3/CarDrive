const Inquiry = require("../models/inquiryModel");

exports.createInquiry = async (req, res) => {
  try {
    const { car_id, customer_id, message } = req.body;
    const newInquiry = new Inquiry({ car_id, customer_id, message });
    await newInquiry.save();
    res.status(201).json({ message: "Inquiry submitted successfully", inquiry: newInquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("car_id") 
      .populate("customer_id", "name email");
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedInquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.status(200).json({ message: "Status updated", inquiry: updatedInquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};