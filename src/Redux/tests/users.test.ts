import {
  getTotalCountUsersAC,
  getUsersAC,
  UsersReducer,
  UserStateType,
} from "Redux/users-reducer";

let initialState: UserStateType = {
  items: [],
  pageSize: 0,
  currentPage: 0,
  totalCount: 0,
  error: "",
  isFetching: false,
  isDisabledBtn: [],
};

beforeEach(() => {
  initialState = {
    items: [
      {
        id: 9,
        name: "Jon",
        photos: { small: "10px", large: "40px" },
        status: "new",
        followed: false,
        uniqueUrlName: "name",
      },
      {
        id: 10,
        name: "Ivan",
        photos: { small: "10px", large: "40px" },
        status: "new status",
        followed: true,
        uniqueUrlName: "xxx",
      },
    ],
    pageSize: 30,
    currentPage: 2,
    totalCount: 100,
    error: "",
    isFetching: false,
    isDisabledBtn: [],
  };
});

test("get users", () => {
  const users = [
    {
      id: 11,
      name: "Bil",
      photos: { small: "13px", large: "44px" },
      status: "no status",
      followed: false,
      uniqueUrlName: "ddd",
    },
    {
      id: 12,
      name: "Igor",
      photos: { small: "12px", large: "42px" },
      status: "old status",
      followed: true,
      uniqueUrlName: "ssss",
    },
  ];
  const newState = UsersReducer(initialState, getUsersAC(users));

  expect(newState.items[1].id).toBe(10);
  expect(newState.items[3].id).toBe(12);
  expect(newState.items[0].id).toBe(9);
  expect(newState.items[0].name).toBe("Jon");
  expect(newState.items[3].name).toBe("Igor");
  expect(newState.items.length).toBe(4);
});

test("totalCount should be changed", () => {
  const newState = UsersReducer(initialState, getTotalCountUsersAC(10));

  expect(newState.totalCount).toBe(10);
});
