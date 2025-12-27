const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		image: {
			type: String, // URL or file path for the user's image
			default: "", // Optional field
		},
		status: {
			type: String, // e.g., "active", "inactive", "suspended"
			default: "A",
		},
		phone: {
			type: String,
			required: false, // Optional, remove 'required' if phone number is not mandatory
			validate: {
				validator: function (v) {
					return /\d{10}/.test(v); // Basic validation for 10 digit phone number
				},
				message: (props) => `${props.value} is not a valid phone number!`,
			},
		},
	},
	{ timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
