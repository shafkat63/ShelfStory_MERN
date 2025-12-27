import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path to your actual AuthContext file

// Custom hook to access authentication context
const useAuth = () => {
	const authContext = useContext(AuthContext); // Access the context

	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return authContext; // Return all context values and methods
};

export default useAuth;
