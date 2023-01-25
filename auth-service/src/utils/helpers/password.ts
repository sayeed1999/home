import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
const schema = new PasswordValidator();

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

export const validatePassword = async (password: string) => {
  schema
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();
  return schema.validate(password);
};
