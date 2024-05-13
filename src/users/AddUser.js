import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        occupation: ""
    });

    const [responseMessage, setResponseMessage] = useState(""); // State to store the response message

    const [errorMessage, setErrorMessage] = useState(""); // Initialize error message state variable

    const { name, occupation } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8080/users/", user);
            setResponseMessage(response.data);
        } catch (error) {
            setErrorMessage(error.response.data)
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter user name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label for="dropdown">Select Option:</label>

                            <select className="form-control" id="dropdown" name="occupation" onChange={(e) => onInputChange(e)}>
                                <option value="">Choose occupation</option>
                                <option value="COMMON_USER">Common user</option>
                                <option value="STUDENT">Student</option>
                                <option value="UNIVERSITY_EMPLOYEE">University employee</option>
                            </select>

                        </div>

                        {/* Display the response message */}
                        {responseMessage && (
                            <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{responseMessage}</span>
                                <CloseButton onClick={() => setResponseMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>

                        )}
                        <div />

                        {errorMessage && (
                            <div className="alert alert-info justify-content-between align-items-center" style={{ display: 'inline-block' }} role="alert">
                                <span className="ms-2 me-4 ">{errorMessage}</span>
                                <CloseButton onClick={() => setErrorMessage('')} className="me-2" style={{ position: 'absolute', top: '5px', right: '0px' }} />
                            </div>
                        )}
                        <div />

                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/users    ">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
