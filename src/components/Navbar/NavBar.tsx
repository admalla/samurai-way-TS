import React from "react";
import s from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className={s.nav}>
      <div id={s.profLink}>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div id={s.activeLink}>
        <NavLink to="/dialogs">Messages</NavLink>
      </div>
      <div id={s.activeLink}>
        <NavLink to="/users">Users</NavLink>
      </div>
      <div>
        <a href="/news">News</a>
      </div>
      <div>
        <a href="/music">Music</a>
      </div>
      <div>
        <a href="/settings">Settings</a>
      </div>
    </nav>
  );
}

export default NavBar;
