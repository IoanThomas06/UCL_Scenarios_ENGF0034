import { useState, useEffect } from 'react'
import './App.css'
import Layout from './Layout'
import Book from './components/Book'
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Define interface for book data
interface BookType {
  id: number;
  book_info: {
    isbn: string;
    title: string;
    author: string;
    image_url: string;
  };
  condition: string;
}

function Borrowing() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_books/");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred. Please try again later.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
        <Layout>
            <h1> Borrowed books </h1>
            <div className = "bookDisplay">
              {books.map((book: BookType) => (
                <Book id = {book.id} isbn = {book.book_info.isbn} title = {book.book_info.title} author = {book.book_info.author} condition = {book.condition} coverImage={book.book_info.image_url} />
              ))}
            </div>
        </Layout>  
    </>
  )
}

export default Borrowing;