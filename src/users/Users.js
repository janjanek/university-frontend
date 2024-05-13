import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/users/`);
        setUsers(result.data);
    };

    //   const deleteUser = async (id) => {
    //     await axios.delete(`http://localhost:8080/user/`);
    //     loadUsers();
    //   };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow table-striped">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Occupation</th>
                            <th scope="col">Id</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>



                        {users.map((user, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{user.name}</td>
                                <td>{user.occupation}</td>
                                <td>{user.id}</td>
                                <td>

                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/users/${user.id}`}
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