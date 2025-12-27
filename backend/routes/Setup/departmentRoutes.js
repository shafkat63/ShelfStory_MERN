const express = require("express");
const Department = require("../../models/setup/Department");
const { protect, admin } = require("../../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/departments
 * @desc    Create a new department
 */
router.post("/", async (req, res) => {
	try {
		const { name, create_by, status } = req.body;

		const exists = await Department.findOne({ name });
		if (exists) {
			return res.status(400).json({
				success: false,
				message: "Department with this name already exists",
			});
		}

		const department = await Department.create({
			name,
			create_by,
			status,
			//   create_by: req.user.id, // REQUIRED by model
		});

		res.status(201).json({
			success: true,
			message: "Department created successfully",
			data: department,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 */
router.get("/", async (req, res) => {
	try {
		const departments = await Department.find();

		res.json({
			success: true,
			message: "Departments fetched successfully",
			data: departments,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

/**
 * @route   GET /api/departments/:id
 * @desc    Get a single department
 */
router.get("/:id", async (req, res) => {
	try {
		const department = await Department.findById(req.params.id);

		if (!department) {
			return res.status(404).json({
				success: false,
				message: "Department not found",
			});
		}

		res.json({
			success: true,
			message: "Department fetched successfully",
			data: department,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

/**
 * @route   PUT /api/departments/:id
 * @desc    Update a department
 */
router.put("/:id", protect, async (req, res) => {
	try {
		const { name, status } = req.body;

		const department = await Department.findById(req.params.id);
		if (!department) {
			return res.status(404).json({
				success: false,
				message: "Department not found",
			});
		}

		if (name) department.name = name;
		if (status) department.status = status;

		department.update_by = req.user.id;
		department.update_date = new Date();

		await department.save();

		res.json({
			success: true,
			message: "Department updated successfully",
			data: department,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

/**
 * @route   DELETE /api/departments/:id
 * @desc    Delete a department
 */
router.delete("/:id", protect, async (req, res) => {
	try {
		const department = await Department.findById(req.params.id);

		if (!department) {
			return res.status(404).json({
				success: false,
				message: "Department not found",
			});
		}

		await department.deleteOne(); // correct replacement for remove()

		res.json({
			success: true,
			message: "Department deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

module.exports = router;
