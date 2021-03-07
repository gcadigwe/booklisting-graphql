import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/query";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(addBookMutation);

  const handleSubmit = (e) => {
    //prevent reload
    e.preventDefault();
    addBook({
      variables: { name: name, authorId: authorId, genre: genre },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setName("");
    setGenre("");
    setAuthorId("");
  };

  const { loading, error, data } = useQuery(getAuthorsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ):</p>;
  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="field">
          <label>Genre</label>
          <input
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="field">
          <label>Author</label>
          <select
            value={authorId}
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
          >
            <option>Select Authors</option>
            {data.authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddBook;
