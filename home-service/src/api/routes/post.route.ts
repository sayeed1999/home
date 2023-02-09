import { Router } from "express";
const router = Router();
import {
  createPost,
  deletePostById,
  getAllPostsForAdmin,
  getAllPostsForUser,
  getSinglePost,
  getCommentsByPostId,
  updatePostById,
} from "../../modules/post/controllers/rest";

router.post("", createPost);
router.post("", getAllPostsForAdmin);
router.get("active-posts", getAllPostsForUser);
router.get("/:id", getSinglePost);
router.get("/:id/comments", getCommentsByPostId);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;
