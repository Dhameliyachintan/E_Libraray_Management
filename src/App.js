import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import Home from "./pages/Home/Home";
import Navbar from "./component/Navbar";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import BookForm from "./component/BookForm";
import EditBookForm from "./component/EditBookForm";
import Subject from "./component/Subject";
import BookList from "./component/BookLIst";
import Tranding from "./component/Tranding";
import Classic from "./component/Classis";
import BookDetails from "./component/BookDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/trending" element={<Tranding />} />
        <Route path="/classic" element={<Classic />} />
        <Route path="/bookForm" element={<BookForm />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route path="/booklist/:subject?" element={<BookList />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/editBookForm" element={<EditBookForm />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
