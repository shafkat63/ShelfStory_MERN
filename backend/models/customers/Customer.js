const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema(
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
		phone: {
			type: String,
			required: true,
			// validate: {
			// 	validator: function (v) {
			// 		return /\d{11}/.test(v);
			// 	},
			// 	message: (props) => `${props.value} is not a valid phone number!`,
			// },
		},
		address: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive", "suspended"],
			default: "active",
		},
		image: {
			type: String,
			default: "",
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{ timestamps: true }
);

customerSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} catch (error) {
		next(error);
	}
});

customerSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Customer", customerSchema);
