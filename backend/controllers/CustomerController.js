const multer = require("multer");
// const path = require("path");
const Customer = require("../models/customers/Customer");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

exports.createCustomer = [
	upload.single("image"),
	async (req, res) => {
		try {
			const { name, email, phone, address, status, password, image } = req.body;

			const customerExists = await Customer.findOne({ email });
			if (customerExists) {
				return res.status(400).json({ message: "Customer already exists." });
			}

			const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

			const newCustomer = new Customer({
				name,
				email,
				phone,
				address,
				status,
				password,
				image: imageUrl,
			});

			await newCustomer.save();
			res.status(201).json(newCustomer);
		} catch (error) {
			res.status(500).json({ message: "Server error", error: error.message });
		}
	},
];
exports.updateCustomer = [
	upload.single("image"), // Handle image upload
	async (req, res) => {
		try {
			const { name, email, phone, address, status } = req.body;

			// Check if the customer exists
			const customer = await Customer.findById(req.params.id);
			if (!customer) {
				return res.status(404).json({ message: "Customer not found" });
			}

			// Handle image update (if provided)
			let imageUrl = customer.image; // Keep the current image if not updating
			if (req.file) {
				imageUrl = `/uploads/${req.file.filename}`; // New image URL
			}

			// Update the customer
			const updatedCustomer = await Customer.findByIdAndUpdate(
				req.params.id,
				{
					name,
					email,
					phone,
					address,
					status,
					image: imageUrl,
				},
				{ new: true }
			);

			res.status(200).json(updatedCustomer);
		} catch (error) {
			res.status(500).json({ message: "Server error", error: error.message });
		}
	},
];

// Get all customers
exports.getAllCustomers = async (req, res) => {
	try {
		const customers = await Customer.find();
		const customer = await Customer.findById("694fc20fb581c33dc971e620");
		if (!customer) {
			console.log("Customer not found");
			return;
		}
		res.status(200).json(customer);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
	try {
		// const customer = await Customer.findById(req.params.id);
		const customer = await Customer.findById("694fc20fb581c33dc971e620");

		if (!customer) {
			return res.status(404).json({ message: "Customer not found" });
		}
		res.status(200).json(customer);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
	try {
		const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
		if (!deletedCustomer) {
			return res.status(404).json({ message: "Customer not found" });
		}
		res.status(200).json({ message: "Customer deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
