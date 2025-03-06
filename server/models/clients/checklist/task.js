const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  doerName: String,
  department: String,
  frequency: {
    type: String,
    enum: [
      "Daily", "Alternate Days", "Weekly", "Monthly", "Fortnightly", "Quarterly", "Half-yearly", "Yearly"
    ],
  },
  plannedDate: Date,
  nextDueDate: Date, // nextDueDate field
  statusHistory: [
    {
      date: Date,
      status: { type: String, default: "Pending" },
      completedDate: Date, // Date when task was completed
    },
  ],
});

module.exports = mongoose.model("Task", TaskSchema);

