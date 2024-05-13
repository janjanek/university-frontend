import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadBooks();
  }, []);


  const loadBooks = async () => {
    const result = await axios.get(`http://localhost:8080/books/`);
    setBooks(result.data);
  };

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:8080/user/`);
//     loadBooks();
//   };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table table-striped border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Id</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>



          {books.map((book, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.id}</td>
                <td>
                  
                <Link
                    className="btn btn-primary mx-2"
                    to={`/books/${book.id}`}
                  >
                    View
                  </Link>

                </td>

              </tr>
            ))}



          </tbody>
        </table>
      </div>
    </div>
  );
}