import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user-context";
import Homepage from "./pages/Homepage";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Rentals from "./pages/Rentals";
import User from "./pages/User";
import Book from "./pages/Books";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/users/rents" element={<Rentals />} />
            <Route path="/users-management" element={<User />} />
            <Route path="/books" element={<Book />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
