import { Router } from "express";
import { validatePostOnCommentRoutes } from "../middlewares/post.middleware";
const router = Router();
import commentRoute from "./comment.route";
import postRoute from "./post.route";
import userRoute from "./user.route";

// calling middlewares for handling route params from parent routes to child routes..
router.param("post_id", validatePostOnCommentRoutes);

router.use("/posts/:post_id/comments", commentRoute);
router.use("/posts", postRoute);
router.use("/users", userRoute);

export default router;
