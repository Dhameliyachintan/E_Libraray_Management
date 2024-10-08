import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

const BookList = () => {
  const { subject } = useParams(); 
  const navigate = useNavigate(); 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Booklibrary");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredBooks = books.filter(book => {
    const matchesSubject = !subject || subject === "All Books" || book.subject === subject;
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSubject && matchesSearchQuery;
  });

  const handleBorrow = (bookTitle) => {
    setBorrowedBooks((prev) => ({
      ...prev,
      [bookTitle]: !prev[bookTitle],
    }));
    toast.success(
      `You have ${borrowedBooks[bookTitle] ? "returned" : "borrowed"} "${bookTitle}"!`
    );
  };

  const handleView = (book) => {
    navigate('/about', { state: { book } });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {subject ? `${subject} Books` : "All Books"}
      </h1>
      <input
        type="text"
        placeholder="Search by title, author, or category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length === 0 ? (
          <p>No books available for this subject.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.isbn}
              className="border border-gray-300 rounded-md p-4 bg-gray-50 text-center"
            >
              {book.imageUrl && (
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="mb-2 w-full h-auto rounded-md"
                />
              )}
              <h3 className="font-bold mb-2">{book.title}</h3>
              {borrowedBooks[book.title] ? (
                <button
                  className="mt-2 bg-red-500 text-white rounded p-2 hover:bg-red-600"
                  onClick={() => handleBorrow(book.title)}
                >
                  Return
                </button>
              ) : (
                <button
                  className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                  onClick={() => handleBorrow(book.title)}
                >
                  Borrow
                </button>
              )}
              <button
                className="mt-2 bg-green-500 text-white rounded p-2 hover:bg-green-600 ml-2"
                onClick={() => handleView(book)}
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
