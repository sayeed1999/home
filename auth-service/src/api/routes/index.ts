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

router
  .get("/current-user", authenticate, getCurrentUser)
  .patch("/current-user", authenticate, updateCurrentUser);

export default router;
