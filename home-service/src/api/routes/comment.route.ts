import { Router } from "express";
const router = Router();
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getSingleComment,
  updateCommentById,
} from "../../modules/comment/controllers/rest";

router.post("", createComment);
router.get("", getAllComments);
router.get("/:id", getSingleComment);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentById);

export default router;
