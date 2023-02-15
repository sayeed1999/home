import { Router } from "express";
const router = Router();
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getSingleUser,
  updateUserById,
} from "../../modules/user/controllers/rest";

router.post("", createUser);
router.get("", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
