import CustomError from "../../../utils/errors/custom-error";
import userRepository from "../repository";

const createUser = async (body: any) => {
  const post = await userRepository.create(body);
  return post;
};

const getAllUsers = async () => {
  const post = await userRepository.findAll();
  return post;
};

const getUserById = async (id: any) => {
  const post = await userRepository.findById(id);
  return post;
};

const updateUserById = async (id: any, body: any) => {
  const post = await userRepository.updateById(id, body);
  return post;
};

const updateUser = async (filter: any = {}, body: any) => {
  const post = await userRepository.update(filter, body);
  return post;
};

const deleteUserById = async (id: any) => {
  const post = await userRepository.deleteById(id);
  return post;
};

const deleteUser = async (filter: any) => {
  if (!filter)
    throw new CustomError("cannot delete user without filter specified", 400);
  const post = await userRepository.delete(filter);
  return post;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  updateUser,
  deleteUserById,
  deleteUser,
};
