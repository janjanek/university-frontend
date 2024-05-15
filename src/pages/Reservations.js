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
        const result = await axios.get(`http://localhost:8080/reservations/`);
        setReservations(result.data);
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" className="align-middle fw-normal">#</th>
                            <th scope="col" className="align-middle">Book name</th>
                            <th scope="col" className="align-middle">Reservations</th>
                            <th scope="col" className="align-middle">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservationQueue, index) => (
                            <tr>
                                <th scope="row" className="align-middle" key={index}>
                                    {index + 1}
                                </th>
                                <td className="align-middle">{reservationQueue.name}</td>
                                <td className>
                                    <table className="my-1 table table-bordered table-striped table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col"className="align-middle fw-normal">#</th>
                                                <th scope="col">User name</th>
                                                <th scope="col">Occupation</th>
                                                <th scope="col">Reservation </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservationQueue.userReservations.map((reservation, otherIndex) => (
                                                <tr>
                                                    <th scope="row" key={otherIndex} className="align-middle fw-normal">
                                                        {otherIndex + 1}
                                                    </th>
                                                    <td>{reservation.userName}</td>
                                                    <td> {reservation.occupation}</td>
                                                    <td>{reservation.reservationDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td className="align-middle">
                                    <Link
                                        className="btn btn-primary"
                                        to={`/reservations/${reservationQueue.name}`}
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