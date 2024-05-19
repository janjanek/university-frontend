import React from 'react';
import { Link, useNavigate } from "react-router-dom";


export default function BookReservedSuccess() {
    let navigate = useNavigate();


    return (
        <div className="container">
            <h1>Book successfully reserved for a user. </h1>
        </div>
    );
}