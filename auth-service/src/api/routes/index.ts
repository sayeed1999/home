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
  .all(authenticate)
  // all controllers from here gotcha pass through authenticate middleware!
  .get(getCurrentUser)
  .all(secureUpdateOrDelete)
  // all controllers from here gotcha pass through secureUpdateOrDelete middleware!
  .patch(updateCurrentUser)
  .delete(deleteCurrentUser);
// TODO:- need admin endpoint who can delete any users on platform
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetEmail);

export default router;
