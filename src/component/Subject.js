import React from "react";
import { useNavigate } from "react-router-dom";

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

export default function Subject() {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/booklist/${subject === "All Books" ? "" : subject}`);
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-5">Subject List</h1>
      <ul className="list-none p-0">
        {subjects.map((subject, index) => (
          <li 
            key={index} 
            onClick={() => handleSubjectClick(subject)} 
            className="p-3 mb-3 bg-blue-100 rounded hover:bg-blue-200 cursor-pointer transition duration-200"
          >
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
}
