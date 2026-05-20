const InquiryNote = require("../models/inquiryNotesModel");


exports.addNote = async (req, res) => {
  try {
    const { inquiry_id, admin_id, note } = req.body;
    const newNote = new InquiryNote({ inquiry_id, admin_id, note });
    await newNote.save();
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotesByInquiry = async (req, res) => {
  try {
    const notes = await InquiryNote.find({ inquiry_id: req.params.inquiryId })
      .populate("admin_id", "name email")
      .sort({ created_at: -1 }); 
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};