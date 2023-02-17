import Provider from "../../../models/provider";
import CustomError from "../../../utils/errors/custom-error";
const db = Provider.getInstance();

const createUser = async (body: any) => {
  const post = await db.User.create(body);
  return post;
};
const getAllUsers = async () => {
  const post = await db.User.find();
  return post;
};
const getUserById = async (id: any) => {
  const post = await db.User.findById(id);
  return post;
};
const updateUserById = async (id: any, body: any) => {
  const post = await db.User.findByIdAndUpdate(id, body, { new: true });
  return post;
};
const updateUser = async (filter: any = {}, body: any) => {
  const post = await db.User.findOneAndUpdate(filter, body, { new: true });
  return post;
};
const deleteUserById = async (id: any) => {
  const post = await db.User.findByIdAndDelete(id);
  return post;
};
const deleteUser = async (filter: any) => {
  if (!filter)
    throw new CustomError("cannot delete user without filter specified", 400);
  const post = await db.User.deleteOne(filter);
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
