import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewBook() {
    const [book, setBook] = useState({
        name: "",
        author: "",
        isBorrowed: false,
        borrower: "",
        borrowStart: "",
        borrowEnd: ""
    });

    const { id } = useParams();
    useEffect(() => {
        loadBook();
    }, []);

    const loadBook = async () => {
        const result = await axios.get(`http://localhost:8080/book/find?id=${id}`);
        setBook(result.data);
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Book Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of book id : {book.id}
                            <ul className="list-group list-group-flush">
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
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}