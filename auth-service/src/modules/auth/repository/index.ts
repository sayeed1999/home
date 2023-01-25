import { Provider } from "../../../models/provider";
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

export default { register, findOne };
