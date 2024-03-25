import "./App.css";
import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Bookings from "./pages/Bookings";
import Register from "./pages/Register";
import BookCar from "./pages/BookingCar";
import AdminHome from "./pages/AdminHome";
import UserBookings from "./pages/UserBookings";
import ChangePassword from "./pages/ChangePassword";

function App() {
  
  const isAuthenticatedUser = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !== "admin@gmail.com";
  const isAuthenticatedAdmin = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username === "admin@gmail.com";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes for authenticated users */}
          {isAuthenticatedUser && <Route path="/" element={<Home />} />}
          {isAuthenticatedUser && <Route path="/booking/:carid" element={<BookCar />} />}
          {isAuthenticatedUser && <Route path="/userbookings" element={<UserBookings />} />}
          {isAuthenticatedUser && <Route path="/changepassword" element={<ChangePassword />} />}

          {/* Protected routes for admin users */}
          {isAuthenticatedAdmin && <Route path="/admin" element={<AdminHome />} />}
          {isAuthenticatedAdmin && <Route path="/addcar" element={<AddCar />} />}
          {isAuthenticatedAdmin && <Route path="/editcar/:carid" element={<EditCar />} />}
          {isAuthenticatedAdmin && <Route path="/changepassword" element={<ChangePassword />} />}
          {isAuthenticatedAdmin && <Route path="/users" element={<Users />} />}
          {isAuthenticatedAdmin && <Route path="/bookings" element={<Bookings />} />}

          {/* Redirect to /login if not logged in */}
          {!isAuthenticatedUser && !isAuthenticatedAdmin && (
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
