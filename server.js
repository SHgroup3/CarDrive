const express = require('express');
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const connectDB = require('./config.js/db');
require('dotenv').config();
const { swaggerUi, specs } = require("./swagger");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});