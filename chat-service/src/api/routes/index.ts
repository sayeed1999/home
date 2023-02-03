import { Router } from "express";
const router = Router();
import userRoute from "./user.route";

router.use("/users", userRoute);

export default router;
