import { MessageQueue } from "../utils/constants";
import { subscribe } from "../message-queue";
// importing observers
import homeQueueObserver from "../message-queue/home-queue";
import chatQueueObserver from "../message-queue/chat-queue";

export const subscribeOtherServicesForUserEvents = () => {
  // Alert:- subscribers must have methods with same name!
  // subscribing observers for notifications
  subscribe(MessageQueue.AUTH_HOME, homeQueueObserver);
  subscribe(MessageQueue.AUTH_CHAT, chatQueueObserver);
};
