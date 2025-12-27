import { createContext, useState } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";
import type { User } from "../types/User";

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (
		name: string,
		email: string,
		phone: string,
		address: string,
		password: string,
		confirmPassword: string,
		image: string
	) => Promise<void>;
	fetchProfile: () => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	// User Login
	const login = async (email: string, password: string) => {
		try {
			const res = await api.post("/users/login", { email, password });
			localStorage.setItem("token", res.data.token);
			setUser(res.data.user);
		} catch (err) {
			console.error("Login error:", err);
			throw new Error("Failed to log in. Please try again.");
		}
	};

	// User Registration
	const register = async (
		name: string,
		email: string,
		phone: string,
		address: string,
		password: string,
		confirmPassword: string,
		image: string
	) => {
		// Basic password confirmation check
		if (password !== confirmPassword) {
			throw new Error("Passwords do not match!");
		}

		// Password validation (add more rules if needed)
		if (password.length < 6) {
			throw new Error("Password must be at least 6 characters long.");
		}

		try {
			const res = await api.post("/customers", {
				name,
				email,
				phone,
				address,

				password, // Add the password field
				image,
			});
			localStorage.setItem("token", res.data.token);
			setUser(res.data.user);
		} catch (err) {
			console.error("Registration error:", err);
			throw new Error("Customer registration failed. Please try again.");
		}
	};

	// Fetch Profile
	const fetchProfile = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.log("No token found");
			return;
		}

		try {
			const res = await api.get("/users/profile", {
				headers: {
					Authorization: `Bearer ${token}`, // Ensure the token is passed in the header
				},
			});
			setUser(res.data.user);
		} catch (err) {
			console.error("Error fetching profile:", err);
			logout(); // Log out if fetching the profile fails (e.g., expired token)
		}
	};

	// Logout
	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ user, login, register, fetchProfile, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
