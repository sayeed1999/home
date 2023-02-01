import { Router } from "express";
const router = Router();
import postRoute from "./post.route";
import commentRoute from "./comment.route";
import userRoute from "./user.route";

router.use("/posts", postRoute);
router.use("/comments", commentRoute);
router.use("/users", userRoute);

export default router;
