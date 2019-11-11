import routes from "./db/routes";
import winston from "winston";
import logging from "./startup/logging";
import morgan from "morgan";
import express from "express";
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));
// startup configuration
routes(app);
logging();

// Not found middleware
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.status(404).send({ message: "Endpoint not found." });
});

// call to express server
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`CONNECTED TO PORT ${port}`);
});

// for testing
module.exports = server;
