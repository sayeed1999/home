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
import { authenticate } from "../middlewares";

// No endpoints should be accessed by unauthenticated users on the system..
router.all("*", authenticate);

router.post("", createPost);
router.get("", getAllPostsForAdmin);
router.get("active-posts", getAllPostsForUser);
router.get("/:id", getSinglePost);
router.get("/:id/comments", getCommentsByPostId);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;
