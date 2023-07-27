import React from 'react';
import ava from '../../../../image/user-5.png'
import s from './post.module.css'

type PostType = {
    message: string
    like: number
}
function Post({message, like}: PostType) {
    return (
        <div>
            <div className={s.post}>
                <img className={s.avaPost} src={ava} alt='img'/>
                {message}
            </div>
            <span>Like {like}</span>
        </div>

    );
}

export default Post;