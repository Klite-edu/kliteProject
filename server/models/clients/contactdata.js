const mongoose = require("mongoose");
const db2  = require("../../database/db");
const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  specificEmail: {
    type: String,
    trim: true,
  },
  workAssigned: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  callData: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active",
  },
  permissionAccessLevel: {
    type: String,
    enum: ["Admin", "Manager", "Employee", "Guest"],
    required: true,
  },
  teamAssociation: {
    type: String,
    trim: true,
  },
  activityLog: {
    type: String,
    trim: true,
  },
  pastDataHistory: {
    type: String,
    trim: true,
  },
  receivedEmails: [
    {
      subject: String,
      date: Date,
      sender: String,
      snippet: String,
    },
  ],
  sentEmails: [
    {
      subject: String,
      date: Date,
      recipient: String,
      snippet: String,
    },
  ],
});

const Employee = db2.model("Employee", employeeSchema);
module.exports = Employee;


