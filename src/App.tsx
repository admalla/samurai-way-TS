import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {Users} from "./components/Users/Users";

function App() {
    const WithRouterProfile = withRouter(Profile)
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className="App-content">
                    <Route path='/profile/:id?' render={() => <WithRouterProfile />}
                    />
                    <Route path='/dialogs' render={() => <Dialogs />}
                    />
                    <Route path='/users' render={() => <Users />}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
