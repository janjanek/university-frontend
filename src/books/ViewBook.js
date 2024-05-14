import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CloseButton } from "react-bootstrap";


export default function ViewBook() {
    const [book, setBook] = useState({
        name: "",
        author: "",
        isBorrowed: false,
        borrower: "",
        borrowStart: "",
        borrowEnd: ""
    });

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable


    const { id } = useParams();
    useEffect(() => {
        loadBook();
    }, []);

    const loadBook = async () => {
        await axios.get(`http://localhost:8080/books/${id}`).then(response =>
            setBook(response.data),
        ).catch(err => {
            if (err.message) {
                setErrorMessage(err.response.data);
            } else {
                setErrorMessage("Error occured!");
            }
        }
        );
    };

    const returnBook = async () => {
        await axios.post(`http://localhost:8080/books/return?userId=${book.borrower}&bookId=${book.id}`).then(response => {
            setResponseMessage(response.data);

        }).catch(err => {
            setErrorMessage(err.response.data); // Set error message from error response

        })
    };

    const onSubmit = async (e) => {
        returnBook();
        await loadBook();
    }

    return (
        <div className="container" onSubmit={(e) => onSubmit(e)}>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" >
                    <h2 className="text-center m-4">Book Details</h2>

                    <div className="card" >
                        <div className="card-header">
                            Details of book id : {book.id}
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {book.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Author: </b>
                                    {book.author}
                                </li>
                                <li className="list-group-item">
                                    <b>Is borrowed: </b>
                                    {book.isBorrowed.toString()}
                                </li>
                                <li className="list-group-item">
                                    <b>Borrower: </b>
                                    {book.borrower}
                                </li>
                                <li className="list-group-item">
                                    <b>Borrow start date: </b>
                                    {book.borrowStart}
                                </li>
                                <li className="list-group-item">
                                    <b>Borrow end date: </b>
                                    {book.borrowEnd}
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div>

                        <div />
                        {errorMessage && (
                            <div className="alert alert-danger justify-content-between align-items-center m-3 " style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{errorMessage}</span>
                            </div>
                        )}

                    </div>

                    <div />

                    {/* Display the response message */}
                    {responseMessage && (
                        <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                            <span className="ms-2 me-4 ">{responseMessage}</span>
                            <CloseButton onClick={() => setResponseMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                        </div>

                    )}

                    <div />

                    {!errorMessage && (
                        <Link className="btn btn-outline-danger mx-2" to={`/books/delete/${book.id}`}>
                            Delete book
                        </Link>

                    )}

                    {!errorMessage && (
                        <button className="btn btn-outline-success mx-2" onClick={() => onSubmit()}>
                            Return book
                        </button>
                    )}

                    <Link className="btn btn-primary m-2" to={"/books"}>
                        Back to Book list
                    </Link>
                </div>
            </div>
        </div>
    );
}