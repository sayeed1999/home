import { Worker } from "bullmq";
import { MessageQueue } from "../utils/constants";

export const worker_01 = new Worker(MessageQueue.AUTH_HOME, async (job) => {
  console.log("processed job:", job.name, job.data);
});
