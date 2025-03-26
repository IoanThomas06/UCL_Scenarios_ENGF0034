import { useState, useEffect } from 'react'
import './App.css'
import Layout from './Layout'
import Book from './components/Book'
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Define interface for book data

// Define nested interfaces first since BorrowType depends on BookType
interface BookInfo {
  isbn: string;
  title: string;
  author: string;
  image_url: string;
}

interface BookType {
  id: number;
  book_info: BookInfo;
  condition: string;
}

interface BorrowType {
  person: number;
  book_item: BookType;
  start_date: string;  // ISO date string
  end_date: string;    // ISO date string
  returned_date: string | null;  // ISO date string or null if not returned
}


function Borrowing() {
  const { user } = useAuth();
  
  const [books, setBooks] = useState<BorrowType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (query:string='') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get_books_borrowed`, {
        params: {
          email: user
        }
      });
      console.log(response.data);
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      setError("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
        <Layout>
            <h1> Borrowed books </h1>
            <div className = "bookDisplay">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
              <br></br>
              <br></br>
              <div className = "bookDisplay">
                {books.map((book: any) => (
                  <Book id = {book.book_item.id} isbn = {book.book_item.book_info.isbn} title = {book.book_item.book_info.title} author = {book.book_item.book_info.author} condition={book.book_item.condition} coverImage={book.book_item.book_info.image_url} borrowedDate = {book.start_date} returnDate={book.end_date}  />
                ))}
            </div>
            </div>
        </Layout>  
    </>
  )
}

export default Borrowing;