import { Worker } from "bullmq";
import { Job, MessageQueue } from "../utils/constants";
import userService from "../modules/user/services";

export const worker_01 = new Worker(MessageQueue.AUTH_HOME, async (job) => {
  try {
    console.log("processed job:", job.name, job.data);
    if (job.name === Job.UserCreated) {
      const {
        id: user_id,
        name,
        email,
        phone,
        birthdate,
        gender,
        profile_photo,
      } = job.data;

      // THINK:-
      // Without 'await' keyword, error don't gets caught in catch block, server dies..
      // So, i can't make the worker free immediately.. then what happens if the worker becomes too busy?
      await userService.createUser({
        user_id,
        name,
        email,
        phone,
        birthdate,
        gender,
        profile_photo,
      });
    }
  } catch (err: any) {
    console.error(`# Error occurred while processing job <${job.name}>...`);
    console.error(err.stack);
  }
});
