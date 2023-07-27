import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";


type DialogType = {
    id: number
    name: string
}

type MessageObjectType = {
    id: number
    message: string
}

function Dialogs() {
    const dialogData: Array<DialogType> = [
        {id: 1, name: 'Adam'},
        {id: 2, name: 'Rustam'},
        {id: 3, name: 'Aslan'}
    ]

    const messageData: Array<MessageObjectType> = [
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