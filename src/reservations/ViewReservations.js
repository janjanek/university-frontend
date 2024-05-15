import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CloseButton } from "react-bootstrap";

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
        await axios.get(`http://localhost:8080/reservations/${id}`).then(response => {
            console.log('Getting response:');
            console.log(JSON.stringify(response));
            setReservationQueue(response.data);
        }
        ).catch(err => {
            console.log("error:");
            console.log(JSON.stringify(err));
            setErrorMessage(err.message);
        });
    };


    const onSubmit = async (userId) => {
        await axios.delete(`http://localhost:8080/reservations/${userId}/${reservationQueue.name}`).then(response => {
            console.log('Deleting item with id:', userId);
            console.log(JSON.stringify(response));
            setResponseMessage((response.data));
            window.location.reload();

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
                            <th scope="col">#</th>
                            <th scope="col">userName</th>
                            <th scope="col">Occupation</th>
                            <th scope="col">Reservation </th>
                            <th scope="col">userId</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservationQueue.userReservations.map((reservation, otherIndex) => (
                            <tr >
                                <th scope="row" key={otherIndex}>
                                    {otherIndex + 1}
                                </th>
                                <td> {reservation.userName}</td>
                                <td> {reservation.occupation}</td>
                                <td style={{}}>{reservation.reservationDate}</td>
                                <td >{reservation.userId}</td>
                                <td> <button onClick={() => onSubmit(reservation.userId)} type="submit" className="btn btn-outline-danger btn-sm">
                                    Delete
                                </button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* Display the response message */}
                {responseMessage && (
                    <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                        <span className="ms-2 me-4 ">{responseMessage}</span>
                        <CloseButton onClick={() => setResponseMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                    </div>

                )}

<div/>
                <div />
                {errorMessage && (
                    <div className="alert alert-danger justify-content-between align-items-center m-3 " style={{ display: 'inline-block' }} role="alert">
                        <span className="ms-2 me-4 ">{errorMessage}</span>
                    </div>
                )}

            </div>
            <Link className="btn btn-primary my-2" to={"/reservations"}>
                Back to Reservations list
            </Link>
        </div>
    );
}