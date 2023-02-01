import { Worker } from "bullmq";
import { Job, MessageQueue } from "../utils/constants";
import userService from "../modules/user/services";

export const worker_01 = new Worker(MessageQueue.AUTH_HOME, async (job) => {
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

    userService.createUser({
      user_id,
      name,
      email,
      phone,
      birthdate,
      gender,
      profile_photo,
    });
  }
});
