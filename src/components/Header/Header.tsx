import logo from "../../image/photo_2023-02-04_22-16-23.jpg";
import React, {useEffect} from "react";
import s from './Header.module.css'
import {authUserTC, StateAuthType} from "../Redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "../Redux/redux-store";

function Header() {
    const dispatch = useAppDispatch()
    const auth: StateAuthType = useAppSelector(state => state.auth)

    useEffect(() => {
        dispatch(authUserTC())
    }, []);

    return (
        <header className={s.header}>
            <img src={logo} alt='img'/>
            <div className={s.login}>{auth.isAuth ? auth.login : <span>Login</span>}</div>
        </header>
    );
}

export default Header;