import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/redux-store";
import { updateStatusTC } from "../../../Redux/profile-reducer";

type PropsType = {
  status: string;
  userId: number;
};

export const ProfileStatus = (props: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.status);
  const myId = useAppSelector((state) => state.auth.id);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (myId === props.userId) {
      setEditMode(true);
    }
  };
  const handleBlur = () => {
    dispatch(updateStatusTC(value, props.userId));
    setEditMode(false);
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div style={{ margin: "5px 0 10px 0" }}>
      {editMode ? (
        <input
          autoFocus={true}
          onBlur={handleBlur}
          onChange={onChangeValue}
          value={value}
        />
      ) : (
        <span
          title={"двойной клик для редактирования статуса"}
          onDoubleClick={handleClick}
        >
          <em>{props.status || "No status"}</em>
        </span>
      )}
    </div>
  );
};
