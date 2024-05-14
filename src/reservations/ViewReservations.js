import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewReservationQueue() {
    const [reservationQueue, setReservationQueue] = useState({
        name: "",
        userReservations: []
    });

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const { id } = useParams();
    useEffect(() => {
        loadReservationQueue();
    }, []);

    const loadReservationQueue = async () => {
        const result = await axios.get(`http://localhost:8080/reservations/${id}`);
        setReservationQueue(result.data);
    };


    const onSubmit = async(userId) => {
        await axios.delete(`http://localhost:8080/reservations/${userId}/${reservationQueue.name}`).then(response => {
            console.log('Deleting item with id:', userId);
            console.log(JSON.stringify(response));
            setResponseMessage(JSON.stringify(response));

        }).catch(err => {
            console.log(JSON.stringify(err));
            setErrorMessage(JSON.stringify(err)); // Set error message from error response

        })
    };
    return (
        <div className>
            <div className="" >
                <h2 className="m-5">Reservation Details</h2>

                Details of reservation queue for book named: {reservationQueue.name}
                <table className="table table-bordered table-striped" onSubmit={onSubmit}>
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
                            <tr >
                                <th scope="row" key={otherIndex}>
                                    {otherIndex + 1}
                                </th>
                                <td >{reservation.userId}</td>
                                <td> {reservation.userName}</td>
                                <td> {reservation.occupation}</td>
                                <td style={{}}>{reservation.reservationDate}</td>
                                <td> <button onClick={() => onSubmit(reservation.userId)} type="submit" className="btn btn-outline-danger btn-sm">
                                    Delete
                                </button></td>
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