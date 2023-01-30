import { Router } from "express";
import {
  getCurrentUser,
  login,
  register,
  updateCurrentUser,
} from "../../modules/auth/controllers/rest";
import { authenticate } from "../middlewares";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", authenticate, getCurrentUser);
router.patch("/current-user", authenticate, updateCurrentUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetEmail);

export default router;
