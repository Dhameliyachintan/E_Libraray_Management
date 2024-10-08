import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function BookForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const subjects = [
    "All Books", 
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Biography",
    "Self-Help",
    "Romance",
    "Travel",
    "Business",
  ];

  const categories = [
    "Trending",
    "Classic",
  ];

  const [subjectError, setSubjectError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [publicationDateError, setPublicationDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTitleError("");
    setAuthorError("");
    setGenreError("");
    setIsbnError("");
    setPublicationDateError("");
    setDescriptionError("");
    setImageError("");
    setSubjectError("");
    setCategoryError("");

    let hasError = false;

    if (!title) {
      setTitleError("Title is required.");
      hasError = true;
    }
    if (!author) {
      setAuthorError("Author is required.");
      hasError = true;
    }
    if (!genre) {
      setGenreError("Genre is required.");
      hasError = true;
    }
    if (!isbn) {
      setIsbnError("ISBN is required.");
      hasError = true;
    }
    if (!publicationDate) {
      setPublicationDateError("Publication date is required.");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("Description is required.");
      hasError = true;
    }
    if (!imageUrl) {
      setImageError("Image URL is required.");
      hasError = true;
    }
    if (!selectedSubject) {
      setSubjectError("Subject is required.");
      hasError = true;
    }
    if (!selectedCategory) {
      setCategoryError("Category is required."); 
      hasError = true;
    }

    if (hasError) return;

    const newBook = {
      title,
      author,
      genre,
      isbn,
      publicationDate,
      description,
      imageUrl,
      subject: selectedSubject,
      category: selectedCategory, 
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/Booklibrary",
        newBook
      );

      if (response.status === 201) {
        toast.success("Book created successfully!");
        setSuccess(true);
        setTitle("");
        setAuthor("");
        setGenre("");
        setIsbn("");
        setPublicationDate("");
        setDescription("");
        setImageUrl("");
        setSelectedSubject("");
        setSelectedCategory("");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create book.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add a New Book</h1>
      {success && <p className="text-green-500">Book created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {titleError && <p className="text-red-500">{titleError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {authorError && <p className="text-red-500">{authorError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {genreError && <p className="text-red-500">{genreError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {isbnError && <p className="text-red-500">{isbnError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Publication Date:</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {publicationDateError && <p className="text-red-500">{publicationDateError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {imageError && <p className="text-red-500">{imageError}</p>}
          {imageUrl && (
            <div className="mt-2 flex justify-center items-center flex-col">
              <p className="text-sm text-gray-500 pb-4">Image Preview:</p>
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-1 w-full h-auto rounded max-h-[200px] max-w-[200px]"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select a subject --</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {subjectError && <p className="text-red-500">{subjectError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select a category --</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {categoryError && <p className="text-red-500">{categoryError}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
