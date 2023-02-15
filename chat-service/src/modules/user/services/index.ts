import Provider from "../../../models/provider";
const db = Provider.getInstance();
import repository from "../repository/index";

const createUser = async ({
  user_id,
  name,
  email,
  phone,
  password,
}: {
  [key: string]: string;
}) => {
  const user = repository.createUser({ user_id, name, email, phone, password });
  return user;
};

const getAllUsers = async () => {
  const data = await repository.getAllUsers();
  return data;
};

const getUserById = async (id: string) => {
  const user = await repository.getUserById(id);
  return user;
};

const updateUserById = async (id: string, updatedInfo: any) => {
  const data = await repository.updateUserById(id, updatedInfo);
  return data;
};

const deleteUserById = async (id: string) => {
  const data = await repository.deleteUserById(id);
  return data;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
