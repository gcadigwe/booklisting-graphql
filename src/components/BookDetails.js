import React from "react";
import { getBookQuery } from "../queries/query";
import { useQuery } from "@apollo/client";

const BookDetails = ({ BookID }) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: BookID },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);

  const { book } = data;
  const displayBook = () => {
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map((b) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div id="book-details">{displayBook()}</div>;
};

export default BookDetails;
