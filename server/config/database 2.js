/* ==== Database Configuration ==== */
const mongoose = require("mongoose");
const db = mongoose.connection;


mongoose.connect(process.env.DATABASE_URL);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB Atlas Database! Sick!");
});