import s from "../Dialogs.module.css";
import React from "react";

type MessageType = {
    id: number
    message: string
}
export const Message = ({message}: MessageType) => {
    return (
        <div className={s.message}>{message}</div>
    )
}