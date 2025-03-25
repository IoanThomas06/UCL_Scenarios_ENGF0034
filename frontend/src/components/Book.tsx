import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Book interface
interface BookProps {
  id: number;
  isbn: string;
  title: string;
  author: string;
  condition: string;
  coverImage?: string;
  borrowedDate?: string;
  returnDate?: string;
}


// Individual Book Card Component
function Book({ 
    id, isbn, title, author, condition, coverImage, borrowedDate, returnDate,
}: BookProps){
  return (
    <>
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <div className="h-100 bg-light d-flex align-items-center justify-content-center">
            {coverImage ? (
              <img
                src={coverImage}
                alt={`Cover of ${title}`}
                className="img-fluid rounded-start"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-center p-5 text-secondary">
                No Cover Available
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="row">
              <div className="col-md-6">
                <p className="card-text mb-1">
                  <strong>ISBN:</strong> {isbn}
                </p>
                <p className="card-text mb-1">
                  <strong>Author:</strong> {author}
                </p>
                <p className="card-text mb-1">
                  <strong>Condition:</strong> {condition}
                </p>
              </div>

            </div>
            <div className="col-md-6">
                {borrowedDate && (
                  <p className="card-text">
                    {`Borrowed: ${borrowedDate}`}
                  </p>
                )}
              </div>
            <div className="col-md-6">
                {returnDate && (
                  <p className="card-text">
                    {`Return by: ${returnDate}`}
                  </p>
                )}
              </div>

          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Book;