import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUser,
  updateUserById,
} from "../../modules/user/controllers/rest";
import { authenticate } from "../middlewares";

router.get("/current-user", authenticate, getCurrentUser);
router.post("", createUser);
router.get("", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
