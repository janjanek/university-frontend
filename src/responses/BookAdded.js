import React from 'react';
import { Link, useNavigate } from "react-router-dom";


export default function BookAddedPage() {
    let navigate = useNavigate();


    return (
        <div className="container">
            <h1>Book successfully added to user. </h1>
        </div>
    );
}