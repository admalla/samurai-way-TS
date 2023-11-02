import React from "react";
import { useAppSelector } from "../../../Redux/redux-store";
import img from "../../../image/user-5.png";
import { ProfileStatus } from "./ProfileStatus";

function ProfileInfo() {
  const { profile, status } = useAppSelector((state) => state.profile);

  return (
    <div style={{ marginBottom: "15px" }}>
      <img
        style={{ width: "150px" }}
        src={profile?.photos.small ? profile.photos.small : img}
      />
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
