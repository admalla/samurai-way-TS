import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Users } from "./components/Users/Users";
import { Login } from "./components/Login/Login";

function App() {
  // const WithRouterProfile = withRouter(Profile )
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
        <div className="App-content">
          <Routes>
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
