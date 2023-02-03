import { catchErrors } from "../../../api/middlewares";
import userService from "../services";

export const createUser = catchErrors(async (req: any, res: any, next: any) => {
  const data = await userService.createUser(req.body);
  res.status(201).json({ message: "Created successfully", data });
});

export const getAllUsers = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await userService.getAllUsers();
    res.status(200).json({ data });
  }
);

export const getSingleUser = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await userService.getUserById(req.params.id);
    res.status(200).json({ data });
  }
);

export const updateUserById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await userService.updateUserById(req.params.id, req.body);
    res.status(200).json({ data });
  }
);

export const deleteUserById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await userService.deleteUserById(req.params.id);
    res.status(200).json({ data });
  }
);
