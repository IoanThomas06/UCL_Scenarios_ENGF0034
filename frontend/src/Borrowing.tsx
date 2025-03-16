import { useState } from 'react'
import './App.css'
import Layout from './Layout'
import Book from './components/Book'


function Borrowing() {

  const books = {
    "books": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "borrowedDate": "2022-03-01",
        "returnedDate": "2022-03-15"
      },
      {
        "id": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "borrowedDate": "2022-03-01",
        "returnedDate": "2022-03-15",
      },
      {
        "id": 3,
        "title": "Discrete Mathematics and its Applications",
        "author": "Max Kanovich",
        "genre": "Mathematics",
        "borrowedDate": "2022-03-01",
        "returnedDate": "2022-03-15",
      }
    ]
  };

  return (
    <>
        <Layout>
            <h1> Borrowed books </h1>
            <div className = "bookDisplay">
              {books.books.map((book: any) => (
                <Book id = {book.id} title = {book.title} author = {book.author} genre = {book.genre} borrowedDate={book.borrowedDate} returnDate={book.returnedDate}/>
              ))}
            </div>
        </Layout>  
    </>
  )
}

export default Borrowing;