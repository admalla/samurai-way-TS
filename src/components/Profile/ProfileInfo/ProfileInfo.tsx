import React from 'react';
import {useSelector} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {ProfilePageType} from "../../Redux/profile-reducer";

function ProfileInfo() {
    const profile = useSelector<RootStateType, ProfilePageType>(state => state.profile)
    return (
        <div>
            <img src={profile.profile?.photos.small} />
            <div>{profile.profile?.fullName}</div>
            <div>{profile.profile?.contacts.github}</div>
        </div>
    );
}

export default ProfileInfo;