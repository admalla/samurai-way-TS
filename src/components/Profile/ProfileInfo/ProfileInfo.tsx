import React from 'react';
import {useAppSelector} from "../../Redux/redux-store";
import img from "../../../image/user-5.png"

function ProfileInfo() {
    const profile = useAppSelector(state => state.profile)

    return (
        <div>
            <img style={{width: '150px'}} src={profile.profile?.photos.small ? profile.profile.photos.small : img} />
            <div>{profile.profile?.fullName}</div>
            <div>{profile.profile?.contacts.github}</div>
        </div>
    );
}

export default ProfileInfo;