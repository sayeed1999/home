import { Provider } from "../../../models/provider";
import CustomError from "../../../utils/errors/custom-error";
const db = Provider.getInstance();

const register = async ({
  email,
  hashedPassword,
  salt,
  name,
}: {
  [key: string]: any;
}) => {
  const user = await db.User.create({
    email,
    password: hashedPassword,
    salt,
    name,
  });
  return user;
};

const findOne = async (queryObj: { [key: string]: any }) =>
  await db.User.findOne({ where: queryObj });

const deleteById = async (id: number) => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  return user.destroy();
};

export default { register, findOne, deleteById };
