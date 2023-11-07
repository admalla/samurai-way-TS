import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "Redux/redux-store";
import img from "../../../image/user-5.png";
import { ProfileStatus } from "./ProfileStatus";
import { mainProfilePhotoTC } from "Redux/profile-reducer";
import { ProfileDataEditForm } from "components/Profile/ProfileInfo/ProfileDataEditForm";
import { ProfileDataForm } from "components/Profile/ProfileInfo/ProfileDataForm";

type Props = {
  isOwner: boolean;
};

function ProfileInfo({ isOwner }: Props) {
  const [editView, setEditView] = useState(false);

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
      {editView ? (
        profile && (
          <ProfileDataEditForm callback={setEditView} profile={profile} />
        )
      ) : (
        <ProfileDataForm callback={setEditView} profile={profile} />
      )}
    </div>
  );
}

export default ProfileInfo;
