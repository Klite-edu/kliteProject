const express = require("express");
const Lead = require("../models/leads-model");

const router = express.Router();

// ✅ Create a New Contact
router.post("/create", async (req, res) => {
    try {
        const { leadName, leadType, companyName } = req.body;

        // Validate required fields
        if (!leadName || !leadType || !companyName) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newLead = new Lead({
            leadName,
            leadType,
            companyName,
        });

        await newLead.save();
        res.status(201).json({ message: "Lead created successfully", lead: newLead });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ error: "Server error while creating lead" });
    }
});

// ✅ Fetch All Contacts
router.get("/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching contacts" });
    }
});

// ✅ Fetch Single Contact by ID
router.get("/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching contact" });
    }
});

// ✅ Update Contact
router.put("/:id", async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
            image: req.file ? req.file.buffer.toString("base64") : req.body.image,
        };
        const contact = await Contact.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.status(200).json({ message: "Contact updated successfully", contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating contact" });
    }
});

// ✅ Delete Contact
router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting contact" });
    }
});

module.exports = router;
