import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        occupation: ""
    });

    const { name, occupation } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user/add", user);
        navigate("/");
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