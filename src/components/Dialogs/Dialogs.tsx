import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemType = {
    name: string
    id: number
}
type MessageType = {
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
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Rustam" id={1} />
                <DialogItem name="Adam" id={2} />
                <DialogItem name="Aslan" id={3} />
                <DialogItem name="Dima" id={4} />
                <DialogItem name="Anton" id={5} />
            </div>
            <div className={s.messages}>
                <Message message="hi world" />
                <Message message="do you speak english?" />
                <Message message="i am from Grozny" />
            </div>
        </div>
    )
}

export default Dialogs;