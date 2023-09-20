import logo from "../../image/photo_2023-02-04_22-16-23.jpg";
import React, {Reducer, useEffect} from "react";
import s from './Header.module.css'
import {usersAPI} from "../../API/api";
import {useDispatch, useSelector} from "react-redux";
import {AuthReducer, getAuthUserAC, StateAuthType} from "../Redux/auth-reducer";
import {RootStateType} from "../Redux/redux-store";

function Header() {
    const dispatch = useDispatch()
    const auth: StateAuthType = useSelector<RootStateType, StateAuthType>(state => state.auth)

    useEffect(() => {
        usersAPI.getAuthUser().then(res => {
        dispatch(getAuthUserAC(res.data.data))
        })
    }, []);

    return (
        <header className={s.header}>
            <img src={logo} alt='img'/>
            <div className={s.login}>{auth.isAuth ? auth.login : <span>Login</span>}</div>
        </header>
    );
}

export default Header;