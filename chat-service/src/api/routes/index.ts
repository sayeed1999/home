import { Router } from "express";
const router = Router();
import userRoute from "./user.route";
import dualConversationRoute from "./dual-conversation.route";

router.use("/users", userRoute);
router.use("/conversations/dual", dualConversationRoute);

export default router;
