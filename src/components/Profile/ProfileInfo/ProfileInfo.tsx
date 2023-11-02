import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "Redux/redux-store";
import img from "../../../image/user-5.png";
import { ProfileStatus } from "./ProfileStatus";
import { mainProfilePhotoTC } from "Redux/profile-reducer";

type Props = {
  isOwner: boolean;
};
function ProfileInfo({ isOwner }: Props) {
  const { profile, status } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(mainProfilePhotoTC(e.target.files[0]));
    }
  };
  return (
    <div style={{ marginBottom: "15px" }}>
      <img
        style={{ width: "150px" }}
        src={profile?.photos.small ? profile.photos.small : img}
      />
      {isOwner && <input type={"file"} onChange={onPhotoChange} />}
      <ProfileStatus
        status={status}
        userId={profile ? profile.userId : 21215}
      />
      <div>{profile?.fullName}</div>
      <div>{profile?.contacts.github}</div>
    </div>
  );
}

export default ProfileInfo;
