const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const departmentSchema = new mongoose.Schema(
	{
		// Auto-generated MongoDB _id is still there
		uid: {
			type: String,
			default: uuidv4, // unique identifier
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		create_by: {
			type: String, // could be user ID or name
			required: true,
		},
		create_date: {
			type: Date,
			default: Date.now,
		},
		update_by: {
			type: String,
		},
		update_date: {
			type: Date,
		},
	},
	{ timestamps: true } // automatically adds createdAt and updatedAt
);

module.exports = mongoose.model("Department", departmentSchema);
