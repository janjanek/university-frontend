import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand ms-4 m-3" href="/"><b>Bibliotheca</b></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="btn btn-outline-light me-3" to="/users/add">
          Add User
        </Link>

        <Link className="btn btn-outline-light me-3" to="/users">
          View Users
        </Link>

        <Link className="btn btn-outline-light me-3" to="/books">
          View books
        </Link>

        <Link className="btn btn-outline-light me-3" to="/books/add">
          Add Book
        </Link>

        <Link className="btn btn-outline-light me-3" to="/reservations/add">
          Add Reservation
        </Link>

        <Link className="btn btn-outline-light me-3" to="/reservations">
          View Reservations
        </Link>

        <Link className="btn btn-outline-light me-3" to="/books/return">
          Return Book
        </Link>

      </nav>
    </div>
  )
}
