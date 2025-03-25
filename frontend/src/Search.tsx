import { useState, useEffect } from 'react'
import './App.css'
import Layout from './Layout'
import SearchBar from './components/SearchBar'
import Book from './components/Book'
import axios from 'axios';

// Define interface for book data
interface BookType {
  isbn: string;
  book_info: {
    title: string;
    author: string;
  };
  condition: string;
}

function Search() {


  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    console.log(query);
    setLoading(true);
    fetchBooks(query);
  };

  const fetchBooks = async (query:string='') => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get_books/`, {
        params: {
          search: query
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
        <Layout>
            <h1> Search </h1>
            <br></br>
            <SearchBar onSearch={handleSearch} />
            <br></br>
            <br></br>
            <div className = "bookDisplay">
              {books.map((book: any) => (
                <Book id = {book.id} isbn = {book.book_info.isbn} title = {book.book_info.title} author = {book.book_info.author} condition={book.condition} coverImage={book.book_info.image_url} />
              ))}
            </div>
        </Layout>  
    </>
  )
}

export default Search;