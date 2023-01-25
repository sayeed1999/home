import { validateEmail } from "../../../utils/helpers/email";
import {
  hashPassword,
  validatePassword,
  verifyPassword,
} from "../../../utils/helpers/password";
import { generateToken } from "../../../utils/helpers/jwt";
import repository from "../repository";

const register = async ({
  email,
  password,
  name,
}: {
  [key: string]: string;
}) => {
  if (!email || !validateEmail(email))
    throw new Error("must provide a valid email");
  if (!password || !validatePassword(password))
    throw new Error(
      "must provide a strong password. criteria: min length 6, max length 100, no spaces allowed, must have one uppercase & lowercase, must have atleast two digits"
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
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
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
    throw new Error("User not found");
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
