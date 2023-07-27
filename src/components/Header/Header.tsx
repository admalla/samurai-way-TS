import logo from "../../image/photo_2023-02-04_22-16-23.jpg";
import React from "react";
import s from './Header.module.css'

function Header() {
    return (
        <header className={s.header}>
            <img src={logo} alt='img'/>
        </header>
    );
}

export default Header;