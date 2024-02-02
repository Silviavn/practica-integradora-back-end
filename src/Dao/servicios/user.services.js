import * as userDao from "../Mongo/user.dao";

const createUser = async (user) => {
  const newUser = await userDao.createUser(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await userDao.getUserByEmail(email);
  return user;
};

const getUserById = async (id) => {
  const user = await userDao.getUserById(id);
  return user;
};

const changePassword = async (email, newPassword) => {
  await userDao.changePassword(email, newPassword);
};

export { createUser, getUserByEmail, getUserById, changePassword };