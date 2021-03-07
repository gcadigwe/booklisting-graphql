import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/query";
import BookDetails from "../components/BookDetails";

const BookList = () => {
  const [BookID, setBookID] = useState("");

  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleBookId = (id) => {
    setBookID(id);
    console.log(BookID);
  };
  return (
    <div>
      <ul id="book-list">
        {data.books.map((b) => (
          <li onClick={() => handleBookId(b.id)} key={b.id}>
            {b.name}
          </li>
        ))}
      </ul>
      <BookDetails BookID={BookID} />
    </div>
  );
};

export default BookList;
