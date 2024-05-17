import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';
import { AuthContext } from '../AuthContext';



export default function DeleteUser() {

    const { id } = useParams();
    const {auth} = useContext(AuthContext);
    
    const headers = { headers: {
        'Authorization': `${auth}` 
      } };


    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:8080/users/${id}`, headers).then(response => {

            console.log(response);
            setResponseMessage(response.data);
            // Extract the status from the response
        }).catch(err => {
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
                    <h2 className="text-center m-4">Delete user</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="card">
                            <div className="card-header">
                                Are you sure you want to delete this user?
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Id: {id}</b>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Display the response message */}
                        {responseMessage && (
                            <div className="alert alert-success justify-content-between align-items-center mt-2" style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4">{responseMessage}</span>
                                <CloseButton onClick={() => setResponseMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>

                        )}
                        <div />

                        {errorMessage && (
                            <div className="alert alert-danger justify-content-between align-items-center mt-2 " style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{errorMessage}</span>
                                <CloseButton onClick={() => setErrorMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>
                        )}
                        <div />
                        <button type="submit" className="btn btn-danger px-5 m-2">
                            Delete
                        </button>
                        <Link className="btn btn-primary m-3" to={"/users"}>
                            Back to User list
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}