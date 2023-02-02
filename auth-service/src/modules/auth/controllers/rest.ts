import { catchErrors } from "../../../api/middlewares";
import authService from "../services";

export const register = catchErrors(async (req: any, res: any, next: any) => {
  let { email, password, name } = req.body;
  const user = await authService.register({ email, password, name });
  res.status(201).json({ message: "User created successfully", data: user });
});

export const login = catchErrors(async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  const token = await authService.login({ email, password });
  res.status(200).send({ message: "Login successful", token });
});

export const getCurrentUser = catchErrors(
  async (req: any, res: any, next: any) => {
    const { id } = req.user;
    const user = await authService.getCurrentUser(+id);
    // remove password and salt from response body!!
    res.json({ user });
  }
);

export const updateCurrentUser = catchErrors(
  async (req: any, res: any, next: any) => {
    const user = await authService.updateCurrentUser(req.user.id, req.body);
    res.json({ message: "User updated successfully", data: user });
  }
);

export const deleteCurrentUser = catchErrors(
  async (req: any, res: any, next: any) => {
    const user = await authService.deleteCurrentUser(req.user.id);
    res.json({ message: "User deleted successfully", data: user });
  }
);
