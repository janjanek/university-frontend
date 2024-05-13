import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './layout/Navbar';
import Home from './pages/Home';

import AddUser from './users/AddUser';
import ViewUser from './users/ViewUser';
import AddBook from './books/AddBook';
import AddReservation from './reservations/AddReservation';
import ReturnBook from './reservations/ReturnBook';
import Books from './pages/Books';
import Reservations from './pages/Reservations';
import ViewReservation from './reservations/ViewReservations'
import Users from './users/Users';

import NotFoundPage from './responses/NotFoundPage';
import BookAddedPage from './responses/BookAdded';
import BookReservedSuccess from './responses/BookReserved';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewBook from './books/ViewBook';

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route exact path="/users" element={<Users />} />
          <Route exact path="/users/add" element={<AddUser />} />
          <Route exact path="/users/:id" element={<ViewUser />} />

          <Route exact path="/books/" element={<Books />} />
          <Route exact path="/book/add" element={<AddBook />} />
          <Route exact path="/books/:id" element={<ViewBook />} />
          <Route exact path="/returnBook/" element={<ReturnBook />} />


          <Route exact path="/reservations" element={<Reservations />} />
          <Route exact path="/reservations/:id" element={<ViewReservation />} />
          <Route exact path="/addReservation/" element={<AddReservation />} />





          <Route exact path="/notFoundPage" element={<NotFoundPage />} />
          <Route exact path="/bookAddedSuccess" element={<BookAddedPage />} />
          <Route exact path="/bookReservedSuccess" element={<BookReservedSuccess />} />


        </Routes>
      </Router>

    </div>
  );
}

export default App;
