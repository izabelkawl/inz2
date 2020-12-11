import express from "express";
import keys from "../config/keys.js";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import logger from "./logger.js";
import { ServerRuntimeError } from "../errors/server.js";

// routes
import userRouter from "../routes/user-router.js";
import allotmentRouter from "../routes/allotment-router.js";
import messageRouter from "../routes/message-router.js";
import tableRouter from "../routes/table-router.js";

const app = express();

// Middlewares definition
app.use(express.urlencoded({ extended: true })); //(bodyparser.ulr...false?
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Routing definition
app.use("/api", userRouter);
app.use("/api", allotmentRouter);
app.use("/api", messageRouter);
app.use("/api", tableRouter);

export const startHTTPServer = async () =>
  app.listen(keys.httpPort, (error) => {
    if (error) throw new ServerRuntimeError(error.message);
    else console.log(`Server started on ${keys.httpPort}`.blue);
  });
