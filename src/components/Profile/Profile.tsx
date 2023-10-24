import React, { useEffect } from "react";
import fon from "../../image/tim-mossholder-C5lWDEm2fQA-unsplash.jpg";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {
  AddPostAC,
  getStatusTC,
  userProfileTC,
} from "../Redux/profile-reducer";
import { useAppDispatch, useAppSelector } from "../Redux/redux-store";
import { useParams, Navigate } from "react-router-dom";
import { useFormik } from "formik";

const MY_ID = 21215;

const Profile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  let { id } = useParams<"id">();
  const profileId = id ? +id : MY_ID;

  useEffect(() => {
    dispatch(userProfileTC(profileId));
    dispatch(getStatusTC(profileId));
  }, []);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validate: ({ message }) => {
      const errors: { message?: string } = {};
      if (!message) {
        errors.message = "You must enter a message";
      } else if (message.length > 30) {
        errors.message = "Message should be less than 30 characters";
      }
      return errors;
    },
    onSubmit: ({ message }) => {
      dispatch(AddPostAC(message));
    },
  });

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main>
      <div>
        <img alt={"img"} className={s.fon} src={fon} />
      </div>
      <ProfileInfo />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <textarea {...formik.getFieldProps("message")} />
        </div>
        {formik.touched.message && formik.errors.message && (
          <span style={{ color: "red" }}>{formik.errors.message}</span>
        )}
        <div style={{ marginBottom: " 15px" }}>
          <button type="submit">add post</button>
        </div>
      </form>

      <MyPosts posts={profile.posts} />
    </main>
  );
};

export default Profile;
