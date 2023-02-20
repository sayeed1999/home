import { catchErrors } from "../../../api/middlewares";
import postService from "../services";

export const createPost = catchErrors(async (req: any, res: any, next: any) => {
  const user = req.user;
  const post = req.body;
  const data = await postService.createPost(user, post);
  res.status(201).json({ message: "Created successfully", data });
});

export const getAllPostsForAdmin = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.getAllPostsForAdmin();
    res.status(200).json({ data });
  }
);

export const getAllPostsForUser = catchErrors(
  async (req: any, res: any, next: any) => {
    const data = await postService.getAllPostsForUser();
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
    const data = await postService.updatePostById(
      req.user,
      req.params.id,
      req.body
    );
    res.status(200).json({ data });
  }
);

export const deletePostById = catchErrors(
  async (req: any, res: any, next: any) => {
    let { hardDelete } = req.query;
    const data = await postService.deletePostById(
      req.user,
      req.params.id,
      hardDelete
    );
    res.status(200).json({ data });
  }
);
