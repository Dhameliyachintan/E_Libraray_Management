import React, { useEffect, useState } from "react";
import axios from "axios";

const Trending = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Booklibrary");
        const filteredBooks = response.data.filter(
          (book) => book.category === "Trending"
        );
        setTrendingBooks(filteredBooks);
      } catch (err) {
        setError("Failed to fetch trending books.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = trendingBooks.filter((book) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerCaseTerm) ||
      book.genre.toLowerCase().includes(lowerCaseTerm)
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trending Books : Now</h1>
      
      <input
        type="text"
        placeholder="Search by title or genre..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded p-2 mb-4 w-full"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="p-4 border rounded-lg shadow-md">
            <div className="flex justify-center">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="mt-2 h-40 object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-gray-700">
              <span className="font-bold">Author:</span> {book.author}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Publication Date:</span> {book.publicationDate}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Description:</span> {book.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
