import React from "react";
import s from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { SendMessageAC } from "../../Redux/dialogs-reducer";
import { useAppDispatch, useAppSelector } from "../../Redux/redux-store";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddPostAC } from "Redux/profile-reducer";

function Dialogs() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.dialogs);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validate: ({ message }) => {
      const errors: { message?: string } = {};
      if (!message) {
        errors.message = "You must enter a message";
      } else if (message.length > 30) {
        errors.message = "Message should be less than 30 characters";
      }
      return errors;
    },
    onSubmit: ({ message }) => {
      dispatch(SendMessageAC(message));
      formik.resetForm();
    },
  });

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {state.dialogs.map((d) => {
          return <DialogItem key={d.id} name={d.name} id={d.id} />;
        })}
      </div>
      <div className={s.messages}>
        <div>
          {state.messages.map((m) => {
            return <Message id={m.id} message={m.message} key={m.id} />;
          })}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input {...formik.getFieldProps("message")} />
          </div>
          {formik.touched.message && formik.errors.message && (
            <span style={{ color: "red" }}>{formik.errors.message}</span>
          )}
          <div>
            <button type="submit">send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dialogs;
