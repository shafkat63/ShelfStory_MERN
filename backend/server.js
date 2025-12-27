const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/Setup/departmentRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
