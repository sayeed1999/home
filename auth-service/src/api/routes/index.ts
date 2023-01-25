import { Router } from "express";
import {
  authenticate,
  getCurrentUser,
  login,
  register,
  updateCurrentUser,
} from "../../modules/auth/controllers/rest";
const router = Router();

router.post("/register", register);

router.post("/login", login);

router
  .get("/current-user", authenticate, getCurrentUser)
  .patch("/current-user", authenticate, updateCurrentUser);

export default router;
