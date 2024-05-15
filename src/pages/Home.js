import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [someData, setSomeData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => { };

  return (

    <div className="container shadow p-5">
      <p className="fw-bold">Welcome to Bibliotheca! Official management system for University Libraries.</p>
    </div>
  );
}