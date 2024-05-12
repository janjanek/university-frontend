import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadReservations();
    }, []);


    const loadReservations = async () => {
        const result = await axios.get(`http://localhost:8080/reservation/find/all`);
        setReservations(result.data);
    };

    //   const deleteUser = async (id) => {
    //     await axios.delete(`http://localhost:8080/user/`);
    //     loadReservations();
    //   };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Id</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {reservations.map((reservationQueue, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{reservationQueue.name}</td>
                                <td>
                                    <table className="table table-bordered table-striped table-sm">
                                        <thead>
                                            <tr>
                                                 <th scope="col">S.N</th>
                                                <th scope="col">userId</th>
                                                <th scope="col">Occupation</th>
                                                <th scope="col">Reservation </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {reservationQueue.userReservations.map((reservation, otherIndex) => (
                                                <tr>
                                                    <th scope="row" key={otherIndex}>
                                                        {otherIndex + 1}
                                                    </th>
                                                    <td>{reservation.userId}</td>
                                                    <td> {reservation.occupation}</td>
                                                    <td>{reservation.reservationDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </td>

                                <td>{reservationQueue.id}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/viewReservation/${reservationQueue.id}`}
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