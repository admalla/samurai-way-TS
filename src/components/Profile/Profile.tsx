import React, {ChangeEvent, MutableRefObject, useRef} from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, AddNewTextAC, AddPostAC, profilePageType} from "../Redux/State";

type PropsType = {
    state: profilePageType
    dispatch: (action: ActionsType) => void
}

function Profile(props: PropsType) {

    const addPostHandler = () => {
        props.dispatch(AddPostAC(props.state.valueTextarea))
    }

    const onChangeTextValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(AddNewTextAC(e.currentTarget.value))
    }
    return (
        <main>
            <div>
                <img className={s.fon} src={fon}/>
            </div>
            <ProfileInfo />
            <div>
                <textarea
                    value={props.state.valueTextarea}
                    onChange={onChangeTextValue}
                />
            </div>
            <div>
                <button onClick={addPostHandler}>add post</button>
            </div>
            <MyPosts posts={props.state.posts} />
        </main>
    )
}

export default Profile