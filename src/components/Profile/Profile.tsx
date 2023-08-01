import React, {MutableRefObject, useRef} from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType} from "../Redux/State";

type PropsType = {
    state: profilePageType
    addPost: (text: string) => void
}

function Profile(props: PropsType) {

    let textareaRef = React.createRef<HTMLTextAreaElement>()
    const addPostHandler = () => {
        if(textareaRef.current) {
            props.addPost(textareaRef.current.value)
        }
    }
    return (
        <main>
            <div>
                <img className={s.fon} src={fon}/>
            </div>
            <ProfileInfo />
            <div>
                <textarea ref={textareaRef}/>
            </div>
            <div>
                <button onClick={addPostHandler}>add post</button>
            </div>
            <MyPosts posts={props.state.posts} />
        </main>
    )
}

export default Profile