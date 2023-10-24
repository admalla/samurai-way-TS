import { UserType } from "components/Redux/users-reducer";

/**
 * Обновляет объект в массиве объектов на основе свойства и значения и возвращает новый массив.
 *
 * @param {UserType[]} items - Массив объектов, в котором нужно выполнить обновление.
 * @param {number} userId - Значение для сравнения с указанным свойством объекта.
 * @param {keyof UserType} objPropName - Свойство объекта, которое будет использоваться для сравнения с userId.
 * @param {Partial<UserType>} newObjProps - Часть свойств, которые будут объединены с объектом, если условие выполняется.
 *
 * @returns {UserType[]} - Новый массив объектов с обновленным объектом.
 */
export const updateObjectInArray = (
  items: UserType[],
  userId: number,
  objPropName: keyof UserType,
  newObjProps: Partial<UserType>,
): UserType[] => {
  return items.map((u) =>
    u[objPropName] === userId ? { ...u, ...newObjProps } : u,
  );
};
