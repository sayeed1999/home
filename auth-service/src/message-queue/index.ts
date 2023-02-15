import { Queue, QueueEvents } from "bullmq";
import { Job, MessageQueue } from "../utils/constants";

const auth_home_queue = new Queue(MessageQueue.AUTH_HOME);
const auth_ecom_queue = new Queue(MessageQueue.AUTH_ECOM);
const auth_chat_queue = new Queue(MessageQueue.AUTH_CHAT);

export const fanout_user_creation = async (user: any) => {
  await auth_home_queue.add(Job.UserCreated, user);
  await auth_ecom_queue.add(Job.UserCreated, user);
  await auth_chat_queue.add(Job.UserCreated, user);
};

const queueEvents = [
  new QueueEvents(MessageQueue.AUTH_HOME),
  new QueueEvents(MessageQueue.AUTH_ECOM),
  new QueueEvents(MessageQueue.AUTH_CHAT),
];

queueEvents.map((e) => {
  e.on("completed", ({ jobId }) => {
    console.log("done processing...", jobId);
  });

  e.on(
    "failed",
    ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
      console.error("error processing...", failedReason);
    }
  );
});
