import React from 'react';
import { Link, useNavigate } from "react-router-dom";


export default function NotFoundPage() {
    let navigate = useNavigate();


    return (
        <div className="container">
            <h1>Resource not found </h1>
        </div>
    );
}