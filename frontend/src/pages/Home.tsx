import { useState, useEffect } from "react";
import {
	FaStar,
	FaShoppingCart,
	FaSearch,
	FaBookOpen,
	FaArrowLeft,
	FaCheckCircle,
} from "react-icons/fa";

interface Book {
	id: number;
	title: string;
	author: string;
	price: string;
	image: string;
	rating: number;
	category: string;
	description: string;
}

const Home = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [search, setSearch] = useState("");
	const [cart, setCart] = useState<Book[]>([]);
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);

	useEffect(() => {
		const data: Book[] = [
			{
				id: 1,
				title: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				price: "$12.99",
				image:
					"https://images.unsplash.com/photo-1544934822-2457d3545d10?auto=format&fit=crop&w=600&q=80",
				rating: 4.5,
				category: "Classic",
				description:
					"A classic of 20th-century literature, this novel explores themes of decadence, idealism, and social upheaval in the Roaring Twenties.",
			},
			{
				id: 2,
				title: "1984",
				author: "George Orwell",
				price: "$9.99",
				image:
					"https://images.unsplash.com/photo-1598188303066-65d1e08b68aa?auto=format&fit=crop&w=600&q=80",
				rating: 4,
				category: "Dystopian",
				description:
					"A chilling prophecy about the future, Orwell's masterpiece introduces Big Brother and the thought police in a world of total surveillance.",
			},
			{
				id: 3,
				title: "To Kill a Mockingbird",
				author: "Harper Lee",
				price: "$14.50",
				image:
					"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
				rating: 5,
				category: "Classic",
				description:
					"Compassionate, dramatic, and deeply moving, this novel takes readers to the roots of human behavior—to innocence and experience, kindness and cruelty.",
			},
			{
				id: 4,
				title: "The Hobbit",
				author: "J.R.R. Tolkien",
				price: "$12.50",
				image:
					"https://images.unsplash.com/photo-1563201517-6b6e2a233103?auto=format&fit=crop&w=600&q=80",
				rating: 4.8,
				category: "Fantasy",
				description:
					"Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, until a wizard and a group of dwarves whisk him away on an adventure.",
			},
			{
				id: 5,
				title: "Brave New World",
				author: "Aldous Huxley",
				price: "$10.25",
				image:
					"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80",
				rating: 4.2,
				category: "Dystopian",
				description:
					"Huxley's vision of a future society conditioned to be happy through drugs and biological engineering remains as relevant as ever.",
			},
			// ... all your other books would follow here
		];
		setBooks(data);
	}, []);

	const addToCart = (book: Book) => {
		setCart((prev) => [...prev, book]);
	};

	const filteredBooks = books.filter(
		(book) =>
			book.title.toLowerCase().includes(search.toLowerCase()) ||
			book.author.toLowerCase().includes(search.toLowerCase())
	);

	// --- SUB-COMPONENT: GALLERY VIEW ---
	const GalleryView = () => (
		<>
			<header className="py-12 px-6 text-center bg-white">
				<h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
					The Library
				</h2>
				<p className="text-slate-500 max-w-xl mx-auto italic">
					“A room without books is like a body without a soul.”
				</p>
			</header>

			<main className="max-w-7xl mx-auto py-8 px-4 md:px-6">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{filteredBooks.map((book) => (
						<div
							key={book.id}
							onClick={() => setSelectedBook(book)}
							className="cursor-pointer group bg-white p-2 rounded-xl border border-transparent hover:border-amber-200 transition-all"
						>
							<div className="aspect-[2/3] overflow-hidden rounded-lg mb-3 shadow-sm group-hover:shadow-md transition-shadow">
								<img
									src={book.image}
									alt={book.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
							</div>
							<h4 className="text-sm font-bold font-serif line-clamp-1">
								{book.title}
							</h4>
							<p className="text-[10px] text-slate-400 uppercase tracking-widest">
								{book.author}
							</p>
							<p className="text-amber-700 font-bold mt-2">{book.price}</p>
						</div>
					))}
				</div>
			</main>
		</>
	);

	// --- SUB-COMPONENT: DETAILS VIEW ---
	const DetailsView = ({ book }: { book: Book }) => (
		<main className="max-w-6xl mx-auto py-8 md:py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<button
				onClick={() => setSelectedBook(null)}
				className="flex items-center text-slate-500 hover:text-amber-600 transition-colors mb-8 font-medium"
			>
				<FaArrowLeft className="mr-2" /> Back to Collection
			</button>

			<div className="grid md:grid-cols-2 gap-12 items-start">
				{/* Book Cover */}
				<div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-4 md:p-8">
					<img
						src={book.image}
						alt={book.title}
						className="w-full rounded-lg shadow-inner"
					/>
				</div>

				{/* Content */}
				<div className="space-y-6">
					<div>
						<span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
							{book.category}
						</span>
						<h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 leading-tight">
							{book.title}
						</h2>
						<p className="text-xl text-slate-500 italic mt-2">
							by {book.author}
						</p>
					</div>

					<div className="flex items-center space-x-4">
						<div className="flex text-amber-400">
							{[...Array(5)].map((_, i) => (
								<FaStar
									key={i}
									className={
										i < Math.floor(book.rating)
											? "fill-current"
											: "text-slate-200"
									}
								/>
							))}
						</div>
						<span className="text-slate-400 text-sm font-medium">
							({book.rating} / 5.0 Rating)
						</span>
					</div>

					<div className="py-6 border-y border-slate-100">
						<p className="text-slate-600 leading-relaxed text-lg">
							{book.description ||
								"No description available for this masterpiece yet. Dive into the world of literature and discover the story yourself."}
						</p>
					</div>

					<div className="flex items-center justify-between">
						<span className="text-3xl font-serif font-bold text-slate-900">
							{book.price}
						</span>
						<div className="flex items-center text-green-600 text-sm font-bold">
							<FaCheckCircle className="mr-2" /> In Stock
						</div>
					</div>

					<button
						onClick={() => addToCart(book)}
						className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-amber-600 transition-all flex items-center justify-center shadow-xl shadow-slate-200"
					>
						<FaShoppingCart className="mr-3" /> Add to Shopping Cart
					</button>
				</div>
			</div>

			{/* Related Books Section */}
			<section className="mt-20">
				<h3 className="text-2xl font-serif font-bold mb-8">
					You might also like
				</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{books
						.filter((b) => b.id !== book.id)
						.slice(0, 4)
						.map((related) => (
							<div
								key={related.id}
								onClick={() => {
									setSelectedBook(related);
									window.scrollTo(0, 0);
								}}
								className="cursor-pointer"
							>
								<img
									src={related.image}
									className="aspect-[2/3] object-cover rounded-lg mb-2 opacity-80 hover:opacity-100 transition-opacity"
								/>
								<p className="text-sm font-bold truncate">{related.title}</p>
							</div>
						))}
				</div>
			</section>
		</main>
	);

	return (
		<div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans">
			{/* Navbar remains consistent */}
			<nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
				<div
					className="flex items-center space-x-2 cursor-pointer"
					onClick={() => setSelectedBook(null)}
				>
					<FaBookOpen className="text-amber-600 text-2xl" />
					<h1 className="text-2xl font-serif font-bold tracking-tight">
						Shelf Story
					</h1>
				</div>

				<div className="flex items-center space-x-4">
					{!selectedBook && (
						<div className="hidden md:relative md:block">
							<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="bg-slate-100 rounded-full pl-10 pr-4 py-2 w-48 focus:ring-2 focus:ring-amber-500/20 outline-none text-sm"
							/>
						</div>
					)}
					<button className="relative p-2">
						<FaShoppingCart size={22} />
						{cart.length > 0 && (
							<span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full w-5 h-5 text-[10px] font-bold flex items-center justify-center border-2 border-white">
								{cart.length}
							</span>
						)}
					</button>
				</div>
			</nav>

			{/* Dynamic View Logic */}
			{selectedBook ? <DetailsView book={selectedBook} /> : <GalleryView />}

			<footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
				<p>© {new Date().getFullYear()} Shelf Story. Est. 2025</p>
			</footer>
		</div>
	);
};

export default Home;
