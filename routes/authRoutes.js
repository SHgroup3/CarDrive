const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {protect, adminOnly } = require("../middleware/authMiddleware");


/**
 * @swagger
 * /api/auth/register-secret-admin:
 *   post:
 *     summary: Register a new Admin securely using a secret key
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - adminSecret
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               adminSecret:
 *                 type: string
 *                 description: The secret key configured in the server's .env file
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       403:
 *         description: Invalid Admin Secret Key
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logged-in user profile details (No ID required)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched profile data
 *       401:
 *         description: Not authorized, token missing or invalid
 */

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update logged-in user profile details (No ID required)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authorized
 */

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users list (Admin View)
 *     tags:
 *       - Authentication
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *
 * /api/auth/users/{id}:
 *   get:
 *     summary: Get a specific user details by ID
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update user profile information
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - customer
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete a user from the system
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

router.post("/register-secret-admin", authController.registerAdmin);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.get("/users", protect, adminOnly, authController.getAllUsers);
router.get("/users/:id", protect, adminOnly, authController.getUserById);
router.put("/users/:id", protect, adminOnly, authController.updateUser);
router.delete("/users/:id", protect, adminOnly, authController.deleteUser);

module.exports = router;