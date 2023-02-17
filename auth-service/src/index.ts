import express from "express";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from "./api/routes";
import config from "./config";
import { globalErrorHandler, routeNotFoundHandler } from "./api/middlewares";
import { subscribeOtherServicesForUserEvents } from "./loaders/set-subscriber-for-services";

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// This line will connect other microservices as listeners to user events...
subscribeOtherServicesForUserEvents();

app.use("/", router);
app.all("*", routeNotFoundHandler);
app.use(globalErrorHandler);

app.listen(config.PORT, () => {
  console.log(`# Listening on port ${config.PORT}!`);
});

process.on("uncaughtException", function (err: Error) {
  console.log("================== uncaught exception ======================");
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function (err: Error) {
  console.log("================== unhandled rejection ======================");
  console.error(new Date().toUTCString() + " unhandledRejection:", err.message);
  console.error(err.stack);
  process.exit(1);
});
