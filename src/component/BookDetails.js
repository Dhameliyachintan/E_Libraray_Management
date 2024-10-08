import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  if (!book) {
    return <p>No book data available.</p>;
  }

  const handleEdit = () => {
    navigate("/editBookForm", { state: { book } });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://your-api-url.com/books/${book.id}`);
      toast.success("Book deleted successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete the book.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-48 h-auto rounded-md shadow-md"
            />
          )}
        </div>

        <div className="flex flex-col text-start">
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <p className="mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="mb-2">
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p className="mb-2">
            <strong>Publication Date:</strong> {book.publicationDate}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {book.description}
          </p>
          <p className="mb-2">
            <strong>Subject:</strong> {book.subject}
          </p>
          <p className="mb-2">
            <strong>Category:</strong> {book.category}
          </p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white rounded p-2 hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded p-2 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
