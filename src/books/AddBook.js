import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';


export default function AddBook() {
    let navigate = useNavigate();

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const [book, setBook] = useState({
        name: "",
        author: ""
    });

    const { name, author } = book;

    const onInputChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put("http://localhost:8080/books/", book).then(response => {

            console.log(response);
            setResponseMessage(response.data);
            // Extract the status from the response
        }).catch(err => {
            if (err.message) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage("Error occured!");
            }
        }
        );
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Book</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter book name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Author
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter book author"
                                name="author"
                                value={author}
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

                        <button type="submit" className="btn btn-outline-success">
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