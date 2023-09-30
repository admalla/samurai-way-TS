import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {NewMessageBodyAC, SendMessageAC} from "../Redux/dialogs-reducer";
import {useAppDispatch, useAppSelector} from "../Redux/redux-store";
import {Navigate} from "react-router-dom";

function Dialogs() {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.dialogs)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(NewMessageBodyAC(e.currentTarget.value))
    }
    const onClickButton = () => {
        dispatch(SendMessageAC())
    }

    if(!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {state.dialogs.map(d => {
                    return <DialogItem key={d.id} name={d.name} id={d.id}/>
                })}
            </div>
            <div className={s.messages}>
                <div>
                    {state.messages.map(m => {
                        return <Message id={m.id} message={m.message} key={m.id}/>
                    })}
                </div>
                <div>
                    <div><textarea value={state.newMessageBody} onChange={onChangeTextarea} /></div>
                    <div> <button onClick={onClickButton} >send</button> </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;