import { validateEmail } from "../../../utils/helpers/email";
import {
  hashPassword,
  validatePassword,
  verifyPassword,
} from "../../../utils/helpers/password";
import { generateToken } from "../../../utils/helpers/jwt";
import repository from "../repository";
import CustomError from "../../../utils/errors/custom-error";

const register = async ({
  email,
  password,
  name,
}: {
  [key: string]: string;
}) => {
  if (!email || !validateEmail(email))
    throw new CustomError("must provide a valid email", 400);
  if (!password || !validatePassword(password))
    throw new CustomError(
      "must provide a strong password. criteria: min length 6, max length 100, no spaces allowed, must have one uppercase & lowercase, must have atleast two digits",
      400
    );
  if (!name) name = email.split("@")[0] || "";

  const { hashedPassword, salt } = await hashPassword(password);
  const user = await repository.register({
    email,
    hashedPassword,
    salt,
    name,
  });
  return user;
};

const login = async ({ email, password }: { [key: string]: string }) => {
  const user = await repository.findOne({ email });
  if (!user) {
    throw new CustomError("User doesn't exist", 404);
  }

  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError("Invalid email or password", 400);
  }

  const token = generateToken(user);
  return token;
};

const getCurrentUser = async (id: number) => {
  const user = await repository.findOne({ id });
  return user;
};

const updateCurrentUser = async (
  id: number,
  updated: { [key: string]: any }
) => {
  const user = await repository.findOne({ id });
  if (!user) {
    throw new CustomError("User doesn't exist", 404);
  }
  if (updated.name) user.name = updated.name;
  if (updated.email) user.email = updated.email;
  if (updated.password) {
    const { hashedPassword, salt } = await hashPassword(updated.password);
    user.password = hashedPassword;
    user.salt = salt;
  }
  const updatedUser = await user.update(user);
  return updatedUser;
};

export default { register, login, getCurrentUser, updateCurrentUser };
