import { Field, FieldArray, Form, Formik } from "formik";
import React, { ChangeEvent } from "react";
import {
  updateProfileTC,
  UserProfileContactsType,
  UserProfileType,
} from "Redux/profile-reducer";
import s from "../Profile.module.css";
import { useAppDispatch } from "Redux/redux-store";

type Props = {
  profile: UserProfileType;
  callback: (isView: false) => void;
};

export const ProfileDataEditForm = ({ callback, profile }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Formik
        initialValues={{ profile }}
        onSubmit={(values) => {
          dispatch(updateProfileTC(values.profile));
          callback(false);
        }}
      >
        {({ values, setFieldValue, handleChange }) => {
          console.log(values);
          return (
            <Form>
              <FieldArray name="profile">
                {() => (
                  <div>
                    <div>
                      <b>Full name:</b>
                      <Field
                        value={values.profile.fullName}
                        name={`profile.${profile.fullName}`}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          return setFieldValue(
                            `profile.fullName`,
                            e.target.value,
                          );
                        }}
                        type="text"
                      />
                    </div>
                    <div>
                      <b>About me:</b>
                      <Field
                        name={`profile.${profile.aboutMe}`}
                        value={values.profile.aboutMe}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          return setFieldValue(
                            `profile.aboutMe`,
                            e.target.value,
                          );
                        }}
                        type="text"
                      />
                    </div>
                    <div>
                      <b>Looking for a job: </b>
                      <Field
                        name={`profile.${profile.lookingForAJob}`}
                        type="checkbox"
                        checked={values.profile.lookingForAJob}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          return setFieldValue(
                            `profile.lookingForAJob`,
                            e.target.checked,
                          );
                        }}
                      />
                    </div>
                    <div>
                      <div>
                        <b>Looking for a job description:</b>{" "}
                        <Field
                          name={`profile.${profile.lookingForAJobDescription}`}
                          type="text"
                          value={values.profile.lookingForAJobDescription}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            return setFieldValue(
                              `profile.lookingForAJobDescription`,
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                    </div>
                    <b>Contacts:</b>
                    {values &&
                      Object.keys(values.profile.contacts).map(
                        (contact, index) => {
                          return (
                            <div className={s.contact} key={index}>
                              {contact}:
                              <Field
                                name={`${contact}`}
                                type="text"
                                value={
                                  values.profile.contacts[
                                    contact as keyof UserProfileContactsType
                                  ]
                                }
                                onChange={(
                                  e: ChangeEvent<HTMLInputElement>,
                                ) => {
                                  return setFieldValue(
                                    `profile.contacts.${contact}`,
                                    e.target.value,
                                  );
                                }}
                              />
                            </div>
                          );
                        },
                      )}
                  </div>
                )}
              </FieldArray>
              <button type="submit">save</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
