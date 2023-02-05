import express from "express";
import { json } from "body-parser";
import morgan from "morgan";
import router from "./api/routes";
const app = express();

app.use(json());
app.use(morgan("dev"));
app.use("/", router);

app.listen(4004, () => {
  console.log("Listening on port 4004!");
});
