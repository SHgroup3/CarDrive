const mongoose = require("mongoose")

const connectDB = async () => {
    try{
    await mongoose.connect(process.env.Mongo_URI);
    console.log("Database connected Successfully")
    } catch(err) {
    console.log("Database connection failed", err.message);
    process.exit(1);
    }
}

module.exports = connectDB;