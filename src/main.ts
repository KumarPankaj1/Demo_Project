import express from "express";
import path from "path";
import dotenv from "dotenv/config";
dotenv;
import connection from "./config/mongodb";
import * as Router from "./routes/index";
import { redis } from "./config/redis.db";
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads/videoUploads")));
app.use(express.static(path.join(__dirname, "../uploads/imageUploads")));

const port = process.env.PORT;
connection();
redis.connect();

app.use("/", Router.userRoute.default);
app.use("/", Router.adminRoute.default);
app.use("/", Router.jobRoute.default);

app.listen(port, (): void => {
  console.log(`listen to server on port  ${process.env.PORT}`);
});

// dotenv.config({ path: "../environment/.env"})
// console.log(process.cwd());
// require('dotenv').config();
