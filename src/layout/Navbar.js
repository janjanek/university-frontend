import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

export default function Navbar() {
  return (
    <div class="App-background">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand ms-4 m-3" href="/"><b>Bibliotheca</b></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="ms-2">
            <DropdownButton id="dropdown-basic-button" title="Users" variant="primary fw-bold">
              <Dropdown.Item href="/users/add">Add User</Dropdown.Item>
              <Dropdown.Item href="/users">View Users</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="ms-4">
            <DropdownButton id="dropdown-basic-button" title="Books" variant="primary fw-bold">
              <Dropdown.Item href="/books/add">Add Book</Dropdown.Item>
              <Dropdown.Item href="/books/">View Books</Dropdown.Item>
              <Dropdown.Item href="/books/return">Return Book</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="ms-4">
            <DropdownButton id="dropdown-basic-button" title="Reservations" variant="primary fw-bold">
              <Dropdown.Item href="/reservations/add">Add Reservation</Dropdown.Item>
              <Dropdown.Item href="/reservations">View Reservations</Dropdown.Item>
            </DropdownButton>
          </div>
        </nav>
      </div>
    </div>
  )
}
