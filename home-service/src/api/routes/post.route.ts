import { Router } from "express";
const router = Router();
import {
  createPost,
  deletePostById,
  getAllPosts,
  getSinglePost,
  updatePostById,
} from "../../modules/post/controllers/rest";

router.post("", createPost);
router.get("", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

export default router;