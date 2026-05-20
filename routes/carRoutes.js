const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Add a new car with images(Admin Only)
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - added_by
 *               - make
 *               - model
 *               - year
 *               - price
 *             properties:
 *               added_by:
 *                 type: string
 *               make:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: integer
 *                 example: 2024
 *               price:
 *                 type: number
 *                 example: 5500000
 *               color:
 *                 type: string
 *               fuel_type:
 *                 type: string
 *               mileage:
 *                 type: integer
 *               transmission:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - available
 *                   - sold
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     is_primary:
 *                       type: boolean
 *     responses:
 *       201:
 *         description: Car added successfully
 *   get:
 *     summary: Get all cars with their images
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: Success
 *
 * /api/cars/{id}:
 *   get:
 *     summary: Get details of a single car by ID
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car Object ID
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update car specifications or status
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car Object ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum:
 *                   - available
 *                   - sold
 *               mileage:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car updated successfully
 *   delete:
 *     summary: Remove a car from inventory
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car Object ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 */
router.post("/", protect, adminOnly, carController.createCar);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.put("/:id", protect, adminOnly, carController.updateCar);
router.delete("/:id", protect, adminOnly, carController.deleteCar);

module.exports = router;