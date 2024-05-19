import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../AuthContext';

export default function Books() {
  const [books, setBooks] = useState([]);

  const { id } = useParams();
  const {auth} = useContext(AuthContext);
    
  const headers = { headers: {
    'Authorization': `${auth}` 
  } };


  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    await axios.get(`http://localhost:8080/books/`, headers).then(response => {
      setBooks(response.data);
      // console.log(user);
    }).catch(err =>{
      console.log(JSON.stringify(err));
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table table-striped border shadow">
          <thead>
            <tr>
              <th scope="col" className="fw-normal">#</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Is borrowed</th>
              <th scope="col">Borrowed by</th>
              <th scope="col">Borrow started</th>
              <th scope="col">Borrow ends</th>
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
                <td>{book.isBorrowed && "Borrowed"} {!book.isBorrowed && "Free"}</td>
                <td>{book.userName}</td>
                <td>{book.borrowStart}</td>
                <td>{book.borrowEnd}</td>
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