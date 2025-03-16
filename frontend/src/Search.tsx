import { useState } from 'react'
import './App.css'
import Layout from './Layout'
import SearchBar from './components/SearchBar'
import Book from './components/Book'


function Search() {
  const handleSearch = (query: string) => {
    
    console.log('Searching for:', query);
  };

  const books = {
    "books": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction"
      },
      {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction"
      },
      {
        "id": 3,
        "title": "Discrete Mathematics and its Applications",
        "author": "Max Kanovich",
        "genre": "Mathematics"
      }
    ]
  };


  return (

    <>
        <Layout>
            <h1> Search </h1>
            <p> UCL Book Exchange is the best way for UCL students to exchange pre-owned boooks</p>
            <br></br>
            <SearchBar onSearch={handleSearch} />
            <br></br>
            <br></br>
            <div className = "bookDisplay">
              {books.books.map((book: any) => (
                <Book id = {book.id} title = {book.title} author = {book.author} genre = {book.genre} />
              ))}
            </div>
        </Layout>  
    </>
  )
}

export default Search;