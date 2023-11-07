import { Contact } from "components/Profile/ProfileInfo/Contact";
import React from "react";
import { UserProfileType } from "Redux/profile-reducer";

type Props = {
  profile: UserProfileType | null;
  callback: (isView: boolean) => void;
};
export const ProfileDataForm = ({ profile, callback }: Props) => {
  return (
    <div>
      <div>
        <b>Full name:</b>
        {profile?.fullName}
      </div>
      <div>
        <b>About me:</b>
        {profile?.aboutMe}
      </div>
      <div>
        <b>Looking for a job: </b>
        {profile?.lookingForAJob ? "Yes" : "No"}
      </div>
      <div>
        {profile?.lookingForAJob ? (
          <div>
            <b>Looking for a job description:</b>{" "}
            {profile.lookingForAJobDescription}
          </div>
        ) : null}
      </div>
      <div>
        <b>Contacts: </b>
        {profile?.contacts &&
          Object.keys(profile.contacts).map((key) => {
            return (
              <Contact key={key} name={key} contacts={profile?.contacts} />
            );
          })}
      </div>
      <button onClick={() => callback(true)}>Change</button>
    </div>
  );
};
