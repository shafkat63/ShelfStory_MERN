const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

// @route   POST /api/users/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				success: false,
				message: "User already exists with this email",
			});
		}

		const user = await User.create({ name, email, password });

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			data: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				token: generateToken(user._id),
			},
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
});

// @route   POST /api/users/login
// @desc    Login user and return JWT
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			return res.json({
				success: true,
				message: "Login successful",
				data: {
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
					token: generateToken(user._id),
				},
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// @route   GET /api/users/profile
// @desc    Get logged-in user profile
router.get("/profile", protect, async (req, res) => {
	res.json({
		success: true,
		message: "User profile fetched successfully",
		data: req.user,
	});
});

module.exports = router;
