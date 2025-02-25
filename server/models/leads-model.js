// const mongoose = require("mongoose");

// const LeadSchema = new mongoose.Schema({
//     leadName: { type: String },
//     leadType: { type: String, enum: ["Person", "Organization"] },
//     companyName: { type: String },
//     value: { type: Number },
//     currency: { type: String},
//     phone: { type: String },
//     source: { type: String },
//     industry: { type: String},
//     owner: { type: String },
//     tags: { type: [String], default: [] },
//     rated: { type: Number, min: 1, max: 5 },
//     description: { type: String },
//     visibility: { type: String, enum: ["Public", "Private"]},
//     selectedPeople: { type: [String], default: [] },
//     status: { type: String, enum: ["Active", "Inactive"] }
// }, { timestamps: true });

// const Lead = mongoose.model("Lead", LeadSchema);

// module.exports = Lead; 

const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
    leadName: { type: String, required: true },
    leadType: { type: String, enum: ["Person", "Organization"], required: true },
    companyName: { type: String, required: true },
}, { timestamps: true });

const Lead = mongoose.model("Lead", LeadSchema);
module.exports = Lead;

