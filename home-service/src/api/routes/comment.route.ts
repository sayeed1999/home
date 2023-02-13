import { Router } from "express";
const router = Router();
import {
  createComment,
  deleteCommentById,
  getSingleComment,
  updateCommentById,
} from "../../modules/comment/controllers/rest";
import { authenticate } from "../middlewares";

// No endpoints should be accessed by unauthenticated users on the system..
router.all("*", authenticate);

router.post("", createComment);
router.get("/:id", getSingleComment);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentById);

export default router;
