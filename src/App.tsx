import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {ActionsType, store, StoreType} from "./components/Redux/State";

type PropsType = {
    store: StoreType
    dispatch: (action: ActionsType) => void
}

function App(props: PropsType) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <NavBar/>
                <div className="App-content">
                    <Route path='/profile' render={() => <Profile
                        dispatch={props.dispatch}
                        state={props.store.getState().profilePage}
                    />}
                    />
                    <Route path='/dialogs' render={() => <Dialogs state={props.store.getState().dialogsPage}/>} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App
