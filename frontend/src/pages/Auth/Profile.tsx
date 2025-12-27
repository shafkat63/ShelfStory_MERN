import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Mail, Phone, MapPin, Calendar, ShieldCheck } from "lucide-react";

// 1. Define the Customer Interface based on your API response
interface Customer {
	_id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	status: "active" | "inactive";
	image: string;
	createdAt: string;
	updatedAt: string;
}

// 2. Define Props for the InfoCard component
interface InfoCardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

const CustomerProfile: React.FC = () => {
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	// Using your specific ID from the snippet
	const customerId = "694fc20fb581c33dc971e620";

	useEffect(() => {
		const fetchCustomer = async () => {
			try {
				// Typings for axios response
				const response = await api.get<Customer>(`/customers/${customerId}`);
				setCustomer(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to load profile");
			} finally {
				setLoading(false);
			}
		};

		fetchCustomer();
	}, [customerId]);

	if (loading)
		return (
			<div className="p-8 text-center animate-pulse">Loading profile...</div>
		);
	if (error)
		return (
			<div className="p-8 text-center text-red-500 font-semibold">{error}</div>
		);
	if (!customer) return null;

	const API_URL =  "http://localhost:5000";

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
			<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
				{/* Header/Cover Section */}
				<div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"mport.meta.env.VITE_API_URL ||></div>

				<div className="px-8 pb-8">
					<div className="relative -mt-16 mb-6 flex justify-between items-end">
						<div className="p-1 bg-white rounded-2xl shadow-md border border-gray-100">
							<img
								src={`${API_URL}${customer.image}`}
								alt={customer.name}
								className="h-32 w-32 object-cover rounded-xl"
								onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
									e.currentTarget.src = "https://via.placeholder.com/150";
								}}
							/>
						</div>
						<span
							className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
								customer.status === "active"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{customer.status.toUpperCase()}
						</span>
					</div>

					<div className="space-y-1 mb-8">
						<h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
							{customer.name}
						</h1>
						<p className="text-sm font-mono text-gray-400">
							ID: {customer._id}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<InfoCard
							icon={<Mail size={20} className="text-indigo-500" />}
							label="Email Address"
							value={customer.email}
						/>
						<InfoCard
							icon={<Phone size={20} className="text-indigo-500" />}
							label="Phone Number"
							value={customer.phone}
						/>
						<InfoCard
							icon={<MapPin size={20} className="text-indigo-500" />}
							label="Physical Address"
							value={customer.address}
						/>
						<InfoCard
							icon={<Calendar size={20} className="text-indigo-500" />}
							label="Member Since"
							value={new Date(customer.createdAt).toLocaleDateString(
								undefined,
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						/>
					</div>

					<div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
						<div className="flex items-center text-xs text-gray-400">
							<ShieldCheck className="w-4 h-4 mr-1.5 text-gray-300" />
							Data privacy protection active
						</div>
						<button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
							Edit Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// Sub-component with strict typing
const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => (
	<div className="flex items-center p-4 bg-gray-50/50 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-200 shadow-sm group">
		<div className="p-2.5 bg-white rounded-lg shadow-sm group-hover:bg-indigo-50 transition-colors">
			{icon}
		</div>
		<div className="ml-4">
			<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
				{label}
			</p>
			<p className="text-gray-700 font-semibold text-sm break-all">{value}</p>
		</div>
	</div>
);

export default CustomerProfile;
