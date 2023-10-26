import { AuthReducer } from "components/Redux/auth-reducer";

test("User's authentication", () => {
  const initialState = {
    id: null,
    email: "",
    login: "",
    isAuth: false,
  };

  const action = {
    type: "AUTH/GET_AUTH" as const,
    data: {
      id: 1,
      email: "free@samuraijs.com",
      login: "free",
    },
  };

  let newState = AuthReducer(initialState, action);
  expect(newState.isAuth).toBe(true);
  expect(newState.id).toBe(1);
  expect(newState.login).toBe("free");
});

test("User's logout", () => {
  const initialState = {
    id: null,
    email: "",
    login: "",
    isAuth: false,
  };

  const action = {
    type: "AUTH/LOG_OUT" as const,
  };

  let newState = AuthReducer(initialState, action);
  expect(newState.isAuth).toBe(false);
  expect(newState.id).toBeNull();
  expect(newState.login).toBe("");
});
