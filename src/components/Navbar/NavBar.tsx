import React from "react";
import s from './NavBar.module.css'
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav className={s.nav}>
            <div><NavLink to="/profile" activeClassName={s.active} >Profile</NavLink></div>
            <div><NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink></div>
            <div><a href="/news">News</a></div>
            <div><a href="/music">Music</a></div>
            <div><a href="/settings">Settings</a></div>
        </nav>
    )
}

export default NavBar