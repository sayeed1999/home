import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.listen(4002, () => {
  console.log("Listening on port 4002!");
});
