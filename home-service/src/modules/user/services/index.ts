import Provider from "../../../models/provider";
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
  const post = await db.User.findByIdAndUpdate(id, body);
  return post;
};
const deleteUserById = async (id: any) => {
  const post = await db.User.findByIdAndDelete(id);
  return post;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
