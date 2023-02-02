import { Router } from "express";
import {
  getCurrentUser,
  login,
  register,
  updateCurrentUser,
  deleteCurrentUser,
} from "../../modules/auth/controllers/rest";
import { authenticate, secureUpdateOrDelete } from "../middlewares";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router
  .route("/current-user")
  .get(authenticate, getCurrentUser)
  .patch(authenticate, secureUpdateOrDelete, updateCurrentUser)
  .delete(authenticate, secureUpdateOrDelete, deleteCurrentUser);
// TODO:- need admin endpoint who can delete any users on platform
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetEmail);

export default router;
