import React from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile() {
    return (
        <main>
            <div>
                <img className={s.fon} src={fon}/>
            </div>
            <ProfileInfo />
            <div>
                <textarea />
            </div>
            <div>
                <button>add post</button>
            </div>
            <MyPosts />
        </main>
    )
}

export default Profile