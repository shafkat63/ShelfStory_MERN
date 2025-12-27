import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			alert("Login successful");
		} catch (err: any) {
			alert(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<form
				onSubmit={submitHandler}
				className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6"
			>
				<h2 className="text-2xl font-semibold text-center text-gray-800">
					Sign in to your account
				</h2>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-black focus:ring-2 focus:ring-black/10 outline-none"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
				>
					Login
				</button>

				<p className="text-center text-sm text-gray-600">
					Don’t have an account?{" "}
					<a
						href="/register"
						className="font-medium text-black hover:underline"
					>
						Register
					</a>
				</p>
			</form>
		</div>
	);
};

export default Login;
