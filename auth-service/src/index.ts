import express from "express";
import { json } from "body-parser";
import { Provider } from "./models/provider";

const app = express();

app.use(json());

const db = Provider.getInstance();

app.listen(4001, () => {
  console.log("Listening on port 4001!");
});
