import { usersAPI } from "API/api";
import { handleError } from "common/utils/handle-error";
import { isDisabledBtnAC } from "Redux/users-reducer";
import { AppDispatch } from "Redux/redux-store";
import { AxiosResponse } from "axios";

/**
 * Асинхронный поток для выполнения операции подписки или отписки от пользователя
 *
 * @param {AppDispatch} dispatch - Функция диспетчеризации Redux-действий
 * @param {function} apiMethod - Функция, выполняющая асинхронный запрос к API
 * @param {number} userId - Идентификатор пользователя, к которому применяется действие
 * @param {function} action - Функция для создания и диспетчеризации действия Redux
 *   при успешном выполнении операции
 */
export const followUnfollowFlow = async (
  dispatch: AppDispatch,
  apiMethod: (userId: number) => Promise<AxiosResponse<any, any>>,
  userId: number,
  action: (
    userId: number,
    isFollowed: boolean,
  ) => { type: string; userId: number; isFollowed: boolean },
) => {
  try {
    dispatch(isDisabledBtnAC(true, userId));
    await apiMethod(userId);
    const res = await usersAPI.isFollowed(userId);
    dispatch(action(userId, res.data));
  } catch (err) {
    handleError(err);
  } finally {
    dispatch(isDisabledBtnAC(false, userId));
  }
};
