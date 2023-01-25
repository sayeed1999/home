import express from "express";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./api/routes";
import config from "./config";

const app = express();

app.use(morgan("dev"));
app.use(json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", router);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Cant find ${req.originalUrl} on this server!` });
});

app.use(function (err: any, req: any, res: any, next: any) {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}!`);
});

process.on("uncaughtException", function (err: Error) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function (err: Error) {
  console.error(new Date().toUTCString() + " unhandledRejection:", err.message);
  console.error(err.stack);
  process.exit(1);
});
