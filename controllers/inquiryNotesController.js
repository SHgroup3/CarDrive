const InquiryNote = require("../models/inquiryNotesModel");
const Inquiry = require("../models/inquiryModel");


exports.addNote = async (req, res) => {
  try {
    const admin_id = req.user.id;
    const { inquiry_id, note } = req.body; 

    const newNote = new InquiryNote({ inquiry_id, admin_id, note });
    await newNote.save();
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotesByInquiry = async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    if (userRole === "customer" && inquiry.customer_id.toString() !== userId) {
      return res.status(403).json({ message: "Access Denied! You can only view notes for your own inquiries." });
    }

    const notes = await InquiryNote.find({ inquiry_id: inquiryId })
      .populate("admin_id", "name email")
      .sort({ created_at: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};