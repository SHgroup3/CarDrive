const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const noteController = require("../controllers/inquiryNotesController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Submit a new inquiry for a car
 *     tags:
 *       - Inquiries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car_id
 *               - customer_id
 *               - message
 *             properties:
 *               car_id:
 *                 type: string
 *                 description: Car Object ID
 *               customer_id:
 *                 type: string
 *                 description: Customer User ID
 *               message:
 *                 type: string
 *                 example: "Is this car available for a test drive?"
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *   get:
 *     summary: Get all inquiries list
 *     tags:
 *       - Inquiries
 *     responses:
 *       200:
 *         description: Success
 *
 * /api/inquiries/notes:
 *   post:
 *     summary: Add an internal follow-up note to an inquiry
 *     tags:
 *       - Inquiry Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inquiry_id
 *               - admin_id
 *               - note
 *             properties:
 *               inquiry_id:
 *                 type: string
 *                 description: Inquiry Object ID
 *               admin_id:
 *                 type: string
 *                 description: Admin User ID
 *               note:
 *                 type: string
 *                 example: "Called the customer. They will visit this weekend."
 *     responses:
 *       201:
 *         description: Note added successfully
 *
 * /api/inquiries/{id}/status:
 *   put:
 *     summary: Update inquiry status
 *     tags:
 *       - Inquiries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry Object ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - responded
 *                   - closed
 *     responses:
 *       200:
 *         description: Inquiry status updated successfully
 *
 * /api/inquiries/{inquiryId}/notes:
 *   get:
 *     summary: Get all notes history for a specific inquiry
 *     tags:
 *       - Inquiry Notes
 *     parameters:
 *       - in: path
 *         name: inquiryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Inquiry Object ID
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/notes", noteController.addNote);
router.get("/", protect, adminOnly, inquiryController.getAllInquiries);
router.put("/:id/status", protect, adminOnly, inquiryController.updateInquiryStatus);
router.post("/notes", protect, adminOnly, noteController.addNote);
router.get("/:inquiryId/notes", protect, noteController.getNotesByInquiry);

module.exports = router;