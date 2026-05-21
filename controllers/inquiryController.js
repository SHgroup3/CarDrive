const Inquiry = require("../models/inquiryModel");

exports.createInquiry = async (req, res) => {
  try {
    const added_by = req.user.id;
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

// Get Logged-in Customer's Inquiry History
exports.getCustomerInquiries = async (req, res) => {
  try {
    const customerId = req.user.id;

    const myInquiries = await Inquiry.find({ customer_id: customerId }).populate("car_id");
    
    res.status(200).json(myInquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCustomerInquiries = async (req, res) => {
  try {
    const customerId = req.user.id; // Token se ID li
    const myInquiries = await Inquiry.find({ customer_id: customerId }).populate("car_id");
    res.status(200).json(myInquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};