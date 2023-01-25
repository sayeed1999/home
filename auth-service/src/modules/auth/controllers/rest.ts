import { Provider } from "../../../models/provider";
const db = Provider.getInstance();
import { validate as emailValidate } from "email-validator";
import PasswordValidator from "password-validator";
const passwordValidator = new PasswordValidator();
import { generateToken } from "../../../utils/helpers/jwt";
import { hashPassword, verifyPassword } from "../../../utils/helpers/password";

export const register = async (req: any, res: any, next: any) => {
  try {
    let { email, password, name } = req.body;

    if (!email || !emailValidate(email))
      return res.status(400).json({ message: "must provide a valid email" });
    if (
      !password ||
      !passwordValidator
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
        .spaces()
    )
      return res.status(400).json({
        message:
          "must provide a strong password. criteria: min length 6, max length 100, no spaces allowed, must have one uppercase & lowercase, must have atleast two digits",
      });
    if (!name) name = email.split("@")[0] || "";

    const { hashedPassword, salt } = await hashPassword(password);

    const user = await db.User.create({
      email,
      password: hashedPassword,
      salt,
      name,
    });

    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error creating user" });
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getCurrentUser = async (req: any, res: any, next: any) => {
  try {
    const user = await db.User.findOne({ where: { id: req.user.id } });
    // remove password and salt from response body!!
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user information", error });
  }
};

export const updateCurrentUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password, name } = req.body;
    const user = await db.User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const { hashedPassword, salt } = await hashPassword(password);
      user.password = hashedPassword;
      user.salt = salt;
    }
    const updatedUser = await user.update(user);
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
