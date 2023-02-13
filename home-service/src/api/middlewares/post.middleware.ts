import Provider from "../../models/provider";
const db = Provider.getInstance();

export const validatePostOnCommentRoutes = async (
  req: any,
  res: any,
  next: any,
  post_id: string
) => {
  const postInDB = await db.Post.findById(post_id);

  if (!postInDB)
    return res
      .status(404)
      .json({ message: "the post you are trying to access doesn't exist" });

  req.post_id = post_id;
  next();
};
