import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import CustomerProfilePage from "./pages/Auth/Profile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				{/* Add the customer ID parameter to the profile route */}
				<Route path="/profile/" element={<CustomerProfilePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
