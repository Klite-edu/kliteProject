// routes/contacts.js
const express = require("express");
const router = express.Router();
const ContactData = require("../../models/clients/contactdata"); 
const mongoose = require("mongoose");

// GET all contacts
router.get("/contactinfo", async (req, res) => {
    console.log("enterting to route");
    
  try {
    const contacts = await ContactData.find();
    console.log("employee data", contacts);
    
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact
router.get("/:id", async (req, res) => {
  try {
    const employee = await ContactData.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new contact
router.post("/create", async (req, res) => {
  try {
    const newEmployee = new ContactData(req.body);
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedEmployee = await ContactData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a contact
router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await ContactData.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.deleteOne(); // Delete the employee
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
