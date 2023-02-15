import { NextFunction, Request, Response } from "express";
import { catchErrors } from "../../../api/middlewares";
import service from "../services";

export const sendMessageToUser = catchErrors(
  async (req: any, res: Response, next: NextFunction) => {
    const { user_id: receiver_id } = req.params;
    const data = await service.sendMessageToUser(
      req.user,
      receiver_id,
      req.body
    );
    res.status(201).json({ message: "Created successfully", data });
  }
);

export const getMessagesWithUser = catchErrors(
  async (req: any, res: Response, next: NextFunction) => {
    const { user_id: receiver_id } = req.params;
    const data = await service.getMessagesWithUser(req.user, receiver_id);
    res.status(200).json({ data });
  }
);

export const getConversationList = catchErrors(
  async (req: any, res: Response, next: NextFunction) => {
    const { user_id: receiver_id } = req.params;
    const data = await service.getConversationList(req.user);
    res.status(200).json({ data });
  }
);
