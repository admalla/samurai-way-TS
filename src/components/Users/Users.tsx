import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  followAC,
  followTC,
  getCurrentPageAC,
  getPageSizeAC,
  getUsersAC,
  getUsersTC,
  unfollowAC,
  unfollowTC,
  UserType,
} from "Redux/users-reducer";
import { AppRootState, useAppDispatch } from "Redux/redux-store";
import { User } from "./User/User";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import Preloader from "../../common/Preloader/Preloader";

export const Users = React.memo(() => {
  const dispatch = useAppDispatch();
  const users = useSelector<AppRootState, UserType[]>(
    (state) => state.users.items,
  );
  const totalCount = useSelector<AppRootState, number>(
    (state) => state.users.totalCount,
  );
  const pageSize = useSelector<AppRootState, number>(
    (state) => state.users.pageSize,
  );
  const currentPage = useSelector<AppRootState, number>(
    (state) => state.users.currentPage,
  );
  const isFetching = useSelector<AppRootState, boolean>(
    (state) => state.users.isFetching,
  );
  const isDisabledBtn = useSelector<AppRootState, number[]>(
    (state) => state.users.isDisabledBtn,
  );

  useEffect(() => {
    dispatch(getUsersTC(pageSize, currentPage));
  }, [pageSize, currentPage]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    dispatch(getPageSizeAC(pageSize));
    dispatch(getCurrentPageAC(pageNumber));
    // dispatch(getUsersTC(pageSize, currentPage));
  };

  const onClickFollow = useCallback(
    (userId: number) => {
      dispatch(followTC(userId));
    },
    [followAC],
  );

  const onClickUnfollow = useCallback(
    (userId: number) => {
      dispatch(unfollowTC(userId));
    },
    [unfollowAC],
  );

  return (
    <div>
      <Pagination
        showQuickJumper
        current={currentPage}
        total={totalCount}
        onChange={onChange}
      />
      {isFetching && <Preloader />}
      {users.map((user) => {
        return (
          <User
            userId={user.id}
            key={user.id}
            name={user.name}
            isFollowed={user.followed}
            isDisabledBtn={isDisabledBtn}
            photos={user.photos}
            status={user.status}
            onClickFollow={onClickFollow}
            onClickUnfollow={onClickUnfollow}
          />
        );
      })}
    </div>
  );
});
