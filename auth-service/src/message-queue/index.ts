import { Queue, QueueEvents } from "bullmq";
import { Job, MessageQueue } from "../utils/constants";

const subscribers: { name: string; subscriber: any }[] = [];

export const subscribe = (name: string, subscriber: any) => {
  if (subscribers.find((x) => x.name === name)) return;
  subscribers.push({ name, subscriber });
};

export const fanout_user_creation = async (user: any) => {
  subscribers.map(({ name, subscriber }) =>
    subscriber.notify_user_creation(user)
  );
};

export const fanout_user_update = async (user: any) => {
  subscribers.map(({ name, subscriber }) =>
    subscriber.notify_user_update(user)
  );
};

export const fanout_user_deletion = async (user: any) => {
  subscribers.map(({ name, subscriber }) =>
    subscriber.notify_user_deletion(user)
  );
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
