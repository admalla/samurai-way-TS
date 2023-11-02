import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux/redux-store";
import { loginTC } from "../../Redux/auth-reducer";
import { Navigate } from "react-router-dom";

export function Login() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormEmailType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 5) {
        errors.password = "Should be more five symbols";
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(loginTC(values));
    },
  });

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input type="email" {...formik.getFieldProps("email")} />
      </div>
      {formik.touched.email && formik.errors.email && (
        <span style={{ color: "red" }}>{formik.errors.email}</span>
      )}
      <div>
        <input type="password" {...formik.getFieldProps("password")} />
      </div>
      {formik.touched.password && formik.errors.password && (
        <span style={{ color: "red" }}>{formik.errors.password}</span>
      )}
      <div>
        <input type="checkbox" {...formik.getFieldProps("rememberMe")} />{" "}
        Remember me
      </div>
      <button type="submit">login</button>
    </form>
  );
}

type FormEmailType = {
  email?: string;
  password?: string;
};
