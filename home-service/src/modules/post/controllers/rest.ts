import { catchErrors } from "../../../api/middlewares";
import postService from "../services";

export const createPost = catchErrors(async (req: any, res: any, next: any) => {
  const data = await postService.createPost(req.body);
  res.status(201).json({ message: "Created successfully", data });
});

export const getAllPosts = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.getAllPosts();
    res.status(200).json({ data });
  }
);

export const getSinglePost = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.getPostById(req.params.id);
    res.status(200).json({ data });
  }
);

export const getCommentsByPostId = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.getCommentsByPostId(req.params.id);
    res.status(200).json({ data });
  }
);

export const updatePostById = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.updatePostById(req.params.id, req.body);
    res.status(200).json({ data });
  }
);

export const deletePostById = catchErrors(
  async (req: any, res: any, next: any) => {
    let hardDelete = req.query.hardDelete;
    const data = await postService.deletePostById(req.params.id, hardDelete);
    res.status(200).json({ data });
  }
);
