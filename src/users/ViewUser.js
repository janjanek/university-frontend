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

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/find?id=${id}`);
        setUser(result.data);
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
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}