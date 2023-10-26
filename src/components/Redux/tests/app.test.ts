import { AppReducer } from "components/Redux/app-reducer";

test("initialized should be changed", () => {
  const initialState = {
    initialized: false,
  };

  let newState = AppReducer(initialState, { type: "APP/SET_INITIALIZE" });
  expect(newState.initialized).toBe(true);
});
