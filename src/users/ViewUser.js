import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
    const [user, setUser] = useState({
        name: "",
        occupation: "",
        borrowedBookIds: [""],
        reservedBookNames: [""],
    });

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        await axios.get(`http://localhost:8080/users/${id}`).then(response =>
            setUser(response.data),
        ).catch(err => {
            if (err.message) {
                setErrorMessage(err.response.data);
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
                    <h2 className="text-center m-4">User Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of user id : {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {user.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Occupation: </b>
                                    {user.occupation}
                                </li>
                                <li className="list-group-item">
                                    <b>Borrowed book ids: </b>
                                    <br></br>
                                    {user.borrowedBookIds.map(bookId => (
                                        <React.Fragment key={bookId}>
                                            - {bookId}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </li>

                                <li className="list-group-item">
                                    <b>Reserved book names: </b>
                                    <br></br>
                                    {user.reservedBookNames.map(bookId => (
                                        <React.Fragment key={bookId}>
                                            - {bookId}
                                            <br />
                                        </React.Fragment>
                                    ))}
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

                    {/* Display the response message */}
                    {!errorMessage && (
                        <Link className="btn btn-outline-danger mx-2" to={`/users/delete/${user.id}`}>
                            Delete User
                        </Link>
                    )}

                    <Link className="btn btn-primary m-2" to={"/users"}>
                        Back to User list
                    </Link>
                </div>
            </div>
        </div>
    );
}