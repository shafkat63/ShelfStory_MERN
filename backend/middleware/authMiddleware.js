const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = async (req, res, next) => {
	let token;
	console.log("Protect called on:", req.path);
	console.log("Next type:", typeof next);

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");
			// console.log("this is called");
			next(); // ✅ next MUST be called
		} catch (error) {
			return res.status(401).json({ message: "Not authorized, token failed" });
		}
	} else {
		return res.status(401).json({ message: "Not authorized, no token" });
	}
};

module.exports = { protect };
