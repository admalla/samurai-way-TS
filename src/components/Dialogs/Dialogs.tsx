import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemType = {
    name: string
    id: number
}
type MessageType = {
    id: number
    message: string
}

const DialogItem = ({name, id}: DialogItemType) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/gialogs/" + id}>{name}</NavLink>
        </div>
    )
}

const Message = ({message}: MessageType) => {
    return (
        <div className={s.message}>{message}</div>
    )
}

function Dialogs() {
    const dialogData = [
        {id: 1, name: 'Adam'},
        {id: 2, name: 'Rustam'},
        {id: 3, name: 'Aslan'}
    ]

    const messageData = [
        {id: 1, message: 'hi world'},
        {id: 2, message: 'do you speak english'},
        {id: 3, message: 'I am from Grozny'}
    ]
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogData.map(d => {
                    return <DialogItem key={d.id} name={d.name} id={d.id} />
                })}
            </div>
            <div className={s.messages}>
                {messageData.map(m => {
                    return <Message id={m.id} message={m.message} key={m.id} />
                })}
            </div>
        </div>
    )
}

export default Dialogs;