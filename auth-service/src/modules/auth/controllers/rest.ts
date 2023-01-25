import authService from "../services";

export const register = async (req: any, res: any, next: any) => {
  try {
    let { email, password, name } = req.body;
    const user = await authService.register({ email, password, name });
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error creating user" });
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login({ email, password });
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getCurrentUser = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.user;
    const user = await authService.getCurrentUser(+id);
    // remove password and salt from response body!!
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user information", error });
  }
};

export const updateCurrentUser = async (req: any, res: any, next: any) => {
  try {
    const user = await authService.updateCurrentUser(req.user.id, req.body);
    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
