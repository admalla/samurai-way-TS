import React from 'react';
import Post from "./Post/Post";

type PostType = {
    id: number
    message: string
    like: number
}

function MyPosts() {
    const posts: Array<PostType> = [
        {id: 1, message: 'hello world', like: 15},
        {id: 2, message: 'It is my first post', like: 20}
    ]
    return (
        <div>
            {posts.map(p => {
                return <Post key={p.id} message={p.message} like={p.like}/>
            })}
        </div>
    );
}

export default MyPosts;