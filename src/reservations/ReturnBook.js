import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

export default function ReturnBook() {
    let navigate = useNavigate();

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable


    const [book, setBook] = useState({
        userId: "",
        bookId: ""
    });

    const { userId, bookId } = book;

    const onInputChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const [status, setStatus] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();

        // try{
        await axios.post(`http://localhost:8080/books/return?userId=${userId}&bookId=${bookId}`).then(response => {

            setResponseMessage(response.data);

        }).catch(err => {
            setErrorMessage(err.response.data); // Set error message from error response

        })


    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Return book</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                User id
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter Id of a user to return book"
                                name="userId"
                                value={userId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Book Id
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter id of a book to return"
                                name="bookId"
                                value={bookId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Display the response message */}
                        {responseMessage && (
                            <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{responseMessage}</span>
                                <CloseButton onClick={() => setResponseMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>

                        )}
                        <div />

                        {errorMessage && (
                            <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{errorMessage}</span>
                                <CloseButton onClick={() => setErrorMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>
                        )}
                        <div />

                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/books">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}