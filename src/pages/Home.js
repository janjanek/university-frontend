import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Home() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const authString = `Basic ${btoa(`${username}:${password}`)}`;

    localStorage.setItem('auth', authString);

    console.log(localStorage.getItem('auth'));

    try {

      const response = await fetch('http://localhost:8080/login', {
        method: 'GET',
        headers: {
          'Authorization': authString
        }
      });

      if (response.ok) {
        setMessage('Login successful!');
      } else {
        setMessage('Login failed!');
      }
    } catch (error) {
      setMessage('Login failed!');

    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => { };

  return (
    <div>
      <div className="container shadow p-5">
        <h1 className="fw-bold">Welcome to Bibliotheca! </h1>

        <h4 className="fst-italic mt-3" >Official management system for University Libraries.</h4>

      <div className="container p-5" >
        <div className="m-5">
        <h2 className="text-center">Login</h2>
        <p className="text-center text-muted mt-3">Any unauthorized access may be prosecuted.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label>Username:</label>
            <input type={"text"}
              className="form-control"
              placeholder="Enter username"
              name="name"
              value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="my-5">
            <label>Password:</label>
            <input type="password"
              className="form-control"
              placeholder="Enter username"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-outline-success">
                            login
                        </button>
        </form>
        {message && <p>{message}</p>}
      </div>
      </div>
    </div>
  );
}