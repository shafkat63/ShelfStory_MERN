import { useState, useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";

interface Book {
	id: number;
	title: string;
	author: string;
	price: string;
	image: string;
	rating: number;
}

const Home = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [search, setSearch] = useState("");
	const [cart, setCart] = useState<Book[]>([]);

	useEffect(() => {
		const data: Book[] = [
			{
				id: 1,
				title: "The Great Gatsby",
				author: "F. Scott Fitzgerald",
				price: "$12.99",
				image:
					"https://images.unsplash.com/photo-1544934822-2457d3545d10?auto=format&fit=crop&w=200&q=80",
				rating: 4.5,
			},
			{
				id: 2,
				title: "1984",
				author: "George Orwell",
				price: "$9.99",
				image:
					"https://images.unsplash.com/photo-1598188303066-65d1e08b68aa?auto=format&fit=crop&w=200&q=80",
				rating: 4,
			},
			{
				id: 3,
				title: "To Kill a Mockingbird",
				author: "Harper Lee",
				price: "$14.50",
				image:
					"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80",
				rating: 5,
			},
			{
				id: 4,
				title: "Pride and Prejudice",
				author: "Jane Austen",
				price: "$11.25",
				image:
					"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=200&q=80",
				rating: 4.2,
			},
			{
				id: 5,
				title: "Moby Dick",
				author: "Herman Melville",
				price: "$13.50",
				image:
					"https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&w=200&q=80",
				rating: 3.8,
			},
			{
				id: 6,
				title: "War and Peace",
				author: "Leo Tolstoy",
				price: "$15.99",
				image:
					"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80",
				rating: 4.7,
			},
			{
				id: 7,
				title: "The Catcher in the Rye",
				author: "J.D. Salinger",
				price: "$10.99",
				image:
					"https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=200&q=80",
				rating: 4.1,
			},
			{
				id: 8,
				title: "The Hobbit",
				author: "J.R.R. Tolkien",
				price: "$12.50",
				image:
					"https://images.unsplash.com/photo-1563201517-6b6e2a233103?auto=format&fit=crop&w=200&q=80",
				rating: 4.8,
			},
			{
				id: 9,
				title: "Anna Karenina",
				author: "Leo Tolstoy",
				price: "$13.75",
				image:
					"https://images.unsplash.com/photo-1523473827537-4c1b0b3dc05d?auto=format&fit=crop&w=200&q=80",
				rating: 4.3,
			},
			{
				id: 10,
				title: "The Odyssey",
				author: "Homer",
				price: "$11.50",
				image:
					"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80",
				rating: 4.6,
			},
			{
				id: 11,
				title: "Brave New World",
				author: "Aldous Huxley",
				price: "$10.25",
				image:
					"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=200&q=80",
				rating: 4.2,
			},
			{
				id: 12,
				title: "Jane Eyre",
				author: "Charlotte Brontë",
				price: "$12.75",
				image:
					"https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=200&q=80",
				rating: 4.4,
			},
			{
				id: 13,
				title: "Wuthering Heights",
				author: "Emily Brontë",
				price: "$11.99",
				image:
					"https://images.unsplash.com/photo-1496104679561-38bcd2b6aa13?auto=format&fit=crop&w=200&q=80",
				rating: 4.1,
			},
			{
				id: 14,
				title: "Crime and Punishment",
				author: "Fyodor Dostoevsky",
				price: "$14.00",
				image:
					"https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=200&q=80",
				rating: 4.6,
			},
			{
				id: 15,
				title: "Great Expectations",
				author: "Charles Dickens",
				price: "$12.50",
				image:
					"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=200&q=80",
				rating: 4.3,
			},
			{
				id: 16,
				title: "The Picture of Dorian Gray",
				author: "Oscar Wilde",
				price: "$11.75",
				image:
					"https://images.unsplash.com/photo-1563201517-6b6e2a233103?auto=format&fit=crop&w=200&q=80",
				rating: 4.0,
			},
			{
				id: 17,
				title: "Frankenstein",
				author: "Mary Shelley",
				price: "$10.99",
				image:
					"https://images.unsplash.com/photo-1523473827537-4c1b0b3dc05d?auto=format&fit=crop&w=200&q=80",
				rating: 4.2,
			},
			{
				id: 18,
				title: "Dracula",
				author: "Bram Stoker",
				price: "$9.99",
				image:
					"https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=200&q=80",
				rating: 4.1,
			},
			{
				id: 19,
				title: "Les Misérables",
				author: "Victor Hugo",
				price: "$15.50",
				image:
					"https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=200&q=80",
				rating: 4.7,
			},
			{
				id: 20,
				title: "The Alchemist",
				author: "Paulo Coelho",
				price: "$10.75",
				image:
					"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=200&q=80",
				rating: 4.5,
			},
		];

		setBooks(data);
	}, []);

	const addToCart = (book: Book) => {
		setCart((prev) => [...prev, book]);
		alert(`${book.title} added to cart`);
	};

	const filteredBooks = books.filter((book) =>
		book.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			{/* Navbar */}
			<nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold text-gray-900">Shelf Story</h1>
				<div className="flex items-center space-x-4">
					<input
						type="text"
						placeholder="Search books..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
					/>
					<div className="relative">
						<FaShoppingCart size={24} className="text-gray-700" />
						{cart.length > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
								{cart.length}
							</span>
						)}
					</div>
				</div>
			</nav>

			{/* Hero */}
			<section className="bg-white py-16 px-4 text-center">
				<h2 className="text-4xl font-bold text-gray-900 mb-4">
					Discover Your Next Favorite Book
				</h2>
				<p className="text-gray-600 mb-8">
					Thousands of books across genres, authors, and bestsellers.
				</p>
			</section>

			{/* Books Grid */}
			<section className="py-16 px-4 flex-1">
				<h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
					Featured Books
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{filteredBooks.map((book) => (
						<div
							key={book.id}
							className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
						>
							<img
								src={book.image}
								alt={book.title}
								className="w-full h-60 object-cover"
							/>
							<div className="p-4 flex-1 flex flex-col justify-between">
								<div>
									<h4 className="text-lg font-semibold text-gray-900">
										{book.title}
									</h4>
									<p className="text-gray-600">{book.author}</p>

									{/* Ratings */}
									<div className="flex items-center mt-2">
										{[1, 2, 3, 4, 5].map((i) => (
											<FaStar
												key={i}
												size={14}
												className={`mr-1 ${
													book.rating >= i ? "text-yellow-400" : "text-gray-300"
												}`}
											/>
										))}
										<span className="ml-2 text-sm text-gray-600">
											{book.rating.toFixed(1)}
										</span>
									</div>

									<p className="text-gray-900 font-medium mt-2">{book.price}</p>
								</div>

								<button
									onClick={() => addToCart(book)}
									className="mt-4 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
								>
									<FaShoppingCart className="inline mr-2" /> Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-white shadow-inner py-6 px-4 text-center mt-auto">
				<p className="text-gray-600">
					© {new Date().getFullYear()} Shelf Story. All rights reserved.
				</p>
			</footer>
		</div>
	);
};

export default Home;
