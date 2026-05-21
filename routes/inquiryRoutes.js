const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const noteController = require("../controllers/inquiryNotesController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/inquiries:
 *   post:
 *     summary: Submit a new inquiry for a car (Customer Only)
 *     tags:
 *       - Inquiries
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car_id
 *               - message
 *             properties:
 *               car_id:
 *                 type: string
 *                 description: Car Object ID
 *               message:
 *                 type: string
 *                 example: "Is this car available for a test drive?"
 *     responses:
 *       201:
 *         description: Inquiry submitted successfully
 *
 *   get:
 *     summary: Get all inquiries list (Admin Only)
 *     tags:
 *       - Inquiries
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *
 * /api/inquiries/{id}/status:
 *   put:
 *     summary: Update inquiry status (Admin Only)
 *     tags:
 *       - Inquiries
 *     security:
 *       - bearerAuth: []
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
 * /api/inquiries/notes:
 *   post:
 *     summary: Add an internal follow-up note to an inquiry (Admin Only)
 *     tags:
 *       - Inquiry Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inquiry_id
 *               - note
 *             properties:
 *               inquiry_id:
 *                 type: string
 *               note:
 *                 type: string
 *                 example: "Called the customer, they will visit tomorrow."
 *     responses:
 *       201:
 *         description: Note added successfully
 *
 * /api/inquiries/{inquiryId}/notes:
 *   get:
 *     summary: Get all notes history for a specific inquiry (Admin Only)
 *     tags:
 *       - Inquiry Notes
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /api/inquiries/my-inquiries:
 *   get:
 *     summary: Get logged-in customer's inquiry history (Customer Only)
 *     tags:
 *       - Inquiries
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched customer inquiry history
 *       401:
 *         description: Unauthorized
 */

router.get("/my-inquiries", protect, inquiryController.getCustomerInquiries);
router.post("/", protect, inquiryController.createInquiry);
router.get("/", protect, adminOnly, inquiryController.getAllInquiries);
router.put("/:id/status", protect, adminOnly, inquiryController.updateInquiryStatus);
router.post("/notes", protect, adminOnly, noteController.addNote);
router.get("/:inquiryId/notes", protect, noteController.getNotesByInquiry);

module.exports = router;