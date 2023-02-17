import Provider from "../../../models/provider";
import { IUser } from "../../../models/user.model";
import CustomError from "../../../utils/errors/custom-error";

const db = Provider.getInstance();

const createUser = async (body: any) => {
  const user = await db.User.create(body);
  return user;
};

// TODO: should add return type
// : Promise<{users: IUser[], usersCount: number;}>
const getAllUsers = async () => {
  const users = await db.User.find({});
  const usersCount = users.length;
  return { users, usersCount };
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await db.User.findById(id);
  return user;
};

const updateUserById = async (id: string, updatedInfo: any) => {
  const data = await db.User.findByIdAndUpdate(id, updatedInfo, { new: true });
  return data;
};

const updateUser = async (filter: any = {}, body: any) => {
  const post = await db.User.findOneAndUpdate(filter, body, { new: true });
  return post;
};

const deleteUserById = async (id: string) => {
  const data = await db.User.deleteOne({ id });
  return data;
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
