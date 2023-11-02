import React from "react";
import Post from "./Post/Post";
import { PostType } from "Redux/profile-reducer";

type PropsType = {
  posts: Array<PostType>;
};

function MyPosts(props: PropsType) {
  return (
    <div>
      {props.posts.map((p) => {
        return <Post key={p.id} message={p.message} like={p.like} />;
      })}
    </div>
  );
}

export default MyPosts;
