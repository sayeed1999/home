import { catchErrors } from "../../../api/middlewares";
import commentService from "../services";

export const createComment = catchErrors(
  async (req: any, res: any, next: any) => {
    const { user, post_id, body } = req;
    const data = await commentService.createComment(user, post_id, body);
    res.status(201).json({ message: "Created successfully", data });
  }
);

export const getSingleComment = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await commentService.findById(req.params.id);
    res.status(200).json({ data });
  }
);

export const updateCommentById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await commentService.updateById(req.params.id, req.body);
    res.status(200).json({ data });
  }
);

export const deleteCommentById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await commentService.deleteById(req.params.id);
    res.status(200).json({ data });
  }
);
