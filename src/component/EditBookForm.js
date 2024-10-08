import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subjects = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", 
  "Mystery", "Biography", "Self-Help", "History", 
  "Romance", "Thriller", "Poetry", "Cookbook", 
  "Travel", "Children's", "Young Adult", "Graphic Novel"
];

const categories = [
  "Trending",
  "Classic",
];

const EditBookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    isbn: book.isbn,
    publicationDate: book.publicationDate,
    description: book.description,
    subject: book.subject,
    category: book.category,
    imageUrl: book.imageUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/Booklibrary/${book.id}`, formData);
      console.log("Updated Book Data:", response.data);
      toast.success("Book updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update the book.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          if (key === 'subject') {
            return (
              <div key={key} className="mb-4">
                <label className="block mb-2">
                  <strong>Subject:</strong>
                </label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            );
          } else if (key === 'category') {
            return (
              <div key={key} className="mb-4">
                <label className="block mb-2">
                  <strong>Category:</strong>
                </label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div key={key} className="mb-4">
                <label className="block mb-2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            );
          }
        })}

        {formData.imageUrl && (
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Image Preview:</strong>
            </label>
            <img
              src={formData.imageUrl}
              alt="Book Preview"
              className="w-48 h-auto rounded-md shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
