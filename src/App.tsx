import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {StateType} from "./components/Redux/State";

type PropsType = {
    state: StateType
    addPost: (text: string) => void
}

function App(props: PropsType) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className="App-content">
                    <Route path='/profile' render={() => <Profile addPost={props.addPost} state={props.state.profilePage}/>} />
                    <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage}/>} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
