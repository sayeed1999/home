import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  // Hash the password
  const saltRounds = 11;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { hashedPassword, salt };
};

export const verifyPassword = async (expected: string, actual: string) => {
  return await bcrypt.compare(expected, actual);
};
