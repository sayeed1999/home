import { NextFunction, Request, Response } from "express";
import { catchErrors } from "../../../api/middlewares";
import userService from "../services";

export const createUser = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone, password } = req.body;
    const user = await userService.createUser({ name, email, phone, password });
    res.status(201).json({ message: "Created successfully", data: user });
  }
);

export const getAllUsers = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const usersData = await userService.getAllUsers();
    res
      .status(200)
      .json({ count: usersData.usersCount, users: usersData.users });
  }
);

export const getSingleUser = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ data: user });
  }
);

export const updateUserById = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedInfo = req.body;
    const data = await userService.updateUserById(id, updatedInfo);
    res.status(200).json({ data });
  }
);

export const deleteUserById = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = await userService.deleteUserById(id);
    res.status(200).json({ data });
  }
);
