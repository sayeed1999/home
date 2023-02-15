import { Router } from "express";
const router = Router();
import {
  sendMessageToUser,
  getMessagesWithUser,
  getConversationList,
} from "../../modules/dual-conversation/controllers/rest";
import { authenticate } from "../middlewares";

router.all("*", authenticate);

router.get("/conversation-list", getConversationList);
router.get("/:user_id", getMessagesWithUser);
router.post("/:user_id", sendMessageToUser);

export default router;
