/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import api from "../../api/axios"; // Import the axios instance
import { useNavigate } from "react-router-dom"; // For navigation after successful registration

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
		image: null,
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate(); // Correct usage of navigate in React Router v6

	// Handle form input changes
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle file input (image)
	const handleImageChange = (e: any) => {
		setFormData((prevData) => ({
			...prevData,
			image: e.target.files[0],
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const formDataToSend = new FormData();
		formDataToSend.append("name", formData.name);
		formDataToSend.append("email", formData.email);
		formDataToSend.append("phone", formData.phone);
		formDataToSend.append("address", formData.address);
		formDataToSend.append("password", formData.password);
		if (formData.image) {
			formDataToSend.append("image", formData.image);
		}

		try {
			const response = await api.post("/customers", formDataToSend, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setLoading(false);
			navigate("/login"); // Correct way to navigate to the login page after successful registration
		} catch (error) {
			setLoading(false);
			setError("Error registering customer.");
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

				{error && <div className="text-red-500 text-center mb-4">{error}</div>}

				<form onSubmit={handleSubmit}>
					{/* Name */}
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Phone */}
					<div className="mb-4">
						<label className="block text-gray-700">Phone</label>
						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Address */}
					<div className="mb-4">
						<label className="block text-gray-700">Address</label>
						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Password */}
					<div className="mb-4">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Image */}
					<div className="mb-4">
						<label className="block text-gray-700">
							Profile Image (Optional)
						</label>
						<input
							type="file"
							name="image"
							onChange={handleImageChange}
							className="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded-md"
						disabled={loading}
					>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
