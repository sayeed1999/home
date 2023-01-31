import express from "express";
import { json } from "body-parser";
import { worker_01 } from "./message-queue";
worker_01;

const app = express();

app.use(json());

app.listen(4004, () => {
  console.log("Listening on port 4004!");
});
