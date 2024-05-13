import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewReservationQueue() {
    const [reservationQueue, setReservationQueue] = useState({
        name: "",
        userReservations: []
    });

    const { id } = useParams();
    useEffect(() => {
        loadReservationQueue();
    }, []);

    const loadReservationQueue = async () => {
        const result = await axios.get(`http://localhost:8080/reservations/${id}`);
        setReservationQueue(result.data);
    };


    return (
        <div className>
                <div className="">
                    <h2 className="m-5">Reservation Details</h2>

                            Details of reservation queue for book named: {reservationQueue.name}
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                 <th scope="col">S.N</th>
                                                <th scope="col">userId</th>
                                                <th scope="col">userName</th>
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
                                                    <td >{reservation.userId}</td>
                                                    <td> {reservation.userName}</td>
                                                    <td> {reservation.occupation}</td>
                                                    <td style={{}}>{reservation.reservationDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>


                    </div>
                    <Link className="btn btn-primary my-2" to={"/reservations"}>
                        Back to Reservations list
                    </Link>
                </div>
    );
}