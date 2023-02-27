import DualConversationService from "../../dual-conversation/services";
import GroupConversationService from "../services";
const service = new GroupConversationService(new DualConversationService());
