import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';

import AddUser from './users/AddUser';
import ViewUser from './users/ViewUser';
import AddBook from './books/AddBook';
import AddReservation from './reservations/AddReservation';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addUser" element={<AddUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />

          <Route exact path="/addBook" element={<AddBook />} />

          <Route exact path="/addReservation/" element={<AddReservation />} />


        </Routes>
      </Router>

    </div>
  );
}

export default App;
