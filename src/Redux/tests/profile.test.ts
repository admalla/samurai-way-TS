import {
  getStatusAC,
  ProfilePageType,
  ProfileReducer,
  setUserProfileAC,
} from "Redux/profile-reducer";

let initialState: ProfilePageType = { posts: [], profile: null, status: "" };
beforeEach(() => {
  initialState = {
    posts: [
      { id: 1, message: "hello world", like: 15 },
      { id: 2, message: "It is my first post", like: 20 },
    ],
    profile: null,
    status: "",
  };
});

test("add post", () => {
  const action = {
    type: "PROFILE/ADD-POST" as const,
    message: "message",
  };

  let newState = ProfileReducer(initialState, action);

  expect(newState.posts[2].id).toBe(3);
  expect(newState.posts[2].message).toBe("message");
  expect(newState.posts[1].message).toBe("It is my first post");
  expect(newState.posts[0].like).toBe(15);
});

test("set user's profile", () => {
  const profile = {
    userId: 5,
    lookingForAJob: false,
    lookingForAJobDescription: null,
    fullName: "Adam",
    contacts: {
      github: "string",
      vk: "string",
      facebook: "string",
      instagram: "string",
      twitter: "string",
      website: "string",
      youtube: "string",
      mainLink: "string",
    },
    photos: { small: "20px", large: "50px" },
  };

  let newState = ProfileReducer(initialState, setUserProfileAC(profile));

  expect(newState.profile?.userId).toBe(5);
  expect(newState.profile?.fullName).toBe("Adam");
  expect(newState.profile?.photos.large).toBe("50px");
  expect(newState.profile?.lookingForAJob).toBe(false);
});

test("set status for user", () => {
  let newState = ProfileReducer(initialState, getStatusAC("new status"));

  expect(newState.status).toBe("new status");
});
