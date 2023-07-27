import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className="App-content">
                    <Route path='/profile' render={() => <Profile/>} />
                    <Route path='/dialogs' render={() => <Dialogs/>} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
