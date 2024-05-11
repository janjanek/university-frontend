import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddReservation() {
    let navigate = useNavigate();

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const [reservation, setReservation] = useState({
        userId: "",
        bookName: ""
    });

    const { userId, bookName } = reservation;

    const onInputChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const [status, setStatus] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();

        // try{
        await axios.post(`http://localhost:8080/reservation/add?userId=${userId}&bookName=${bookName}`).then(response => {

            setResponseMessage(response.data);
            // Extract the status from the response
            const statusCode = response.status;

            // Update status state
            setStatus(statusCode);

            // Navigate based on status
            if (statusCode === 200 || statusCode === 201) {
                // Navigate to success route
                //   navigate('/');
            } else if (statusCode === 404) {
                throw new Error(response.status)
                // Navigate to error route
                //   navigate('/NotFoundPage');
            }
            else {
                navigate('/error');
            }
        }).catch(err => {
            setErrorMessage(err.response.data); // Set error message from error response
            
        })
        // } catch{
        // 
        //   };



    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Reservation</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                User id
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter reservation userId"
                                name="userId"
                                value={userId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Book Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter reservation book name"
                                name="bookName"
                                value={bookName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        {/* Display the response message */}
                        {responseMessage && (
                            <div className="alert alert-info" role="alert">
                                {responseMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}


                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}