import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {dialogsPageType} from "../Redux/State";

type PropsType = {
    state: dialogsPageType
}

function Dialogs(props: PropsType) {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.state.dialogs.map(d => {
                    return <DialogItem key={d.id} name={d.name} id={d.id} />
                })}
            </div>
            <div className={s.messages}>
                {props.state.messages.map(m => {
                    return <Message id={m.id} message={m.message} key={m.id} />
                })}
            </div>
        </div>
    )
}

export default Dialogs;