import React from 'react';
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div>
            <Post like={15} message="hello world"/>
            <Post like={20} message="It's my first post"/>
        </div>
    );
}

export default MyPosts;