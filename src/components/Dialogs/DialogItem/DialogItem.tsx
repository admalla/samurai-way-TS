import s from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

type DialogItemType = {
  name: string;
  id: number;
};
export const DialogItem = ({ name, id }: DialogItemType) => {
  return (
    <div className={s.dialog}>
      <NavLink to={"/dialogs/" + id}>{name}</NavLink>
    </div>
  );
};
