require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB (Single Database)
const db = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on("connected", () => console.log("✅ Connected to Admin database"));
db.on("error", (err) => console.error("❌ Error connecting to Admin database:", err));

// Export the connection if needed
module.exports = db;
