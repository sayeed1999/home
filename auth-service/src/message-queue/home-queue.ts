import { Queue, QueueEvents } from "bullmq";
import { Job, MessageQueue } from "../utils/constants";

const auth_home_queue = new Queue(MessageQueue.AUTH_HOME);

const notify_user_creation = async (user: any) => {
  await auth_home_queue.add(Job.UserCreated, user);
};

const notify_user_update = async (user: any) => {
  await auth_home_queue.add(Job.UserUpdated, user);
};

const notify_user_deletion = async (user: any) => {
  await auth_home_queue.add(Job.UserDeleted, user);
};

export default {
  notify_user_creation,
  notify_user_update,
  notify_user_deletion,
};
