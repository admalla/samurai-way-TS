import React from 'react';
import Post from "./Post/Post";

function MyPosts() {
    const postData = [
        {id: 1, message: 'hello world', like: 15},
        {id: 2, message: 'It is my first post', like: 20}
    ]
    return (
        <div>
            {postData.map(p => {
                return <Post key={p.id} message={p.message} like={p.like}/>
            })}
        </div>
    );
}

export default MyPosts;