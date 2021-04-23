import fs from "fs";
import path from "path";

const createIndexJSFile = async (view) => {
  await fs.writeFileSync(
    "index.js",
    `const express = require("express");
  const logger = require("morgan");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const hpp = require("hpp");
  const path = require("path");
  const dotenv = require("dotenv");
  \n

  \ndotenv.config();
  \n
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(hpp());
  app.use(logger("dev"));
  app.use(express.static(path.join(__dirname, "public")));

  \n\n
  app.set("view engine", ${view});
  app.set("views", path.join(__dirname, "views"));
  \n\n
  const port = process.env.PORT || 3000;
  let  server = app.listen(port, () => {
    console.log('Server started running');
  });
    `
  );
};

const createENVFile = async () => {
  await fs.writeFileSync(".env", "PORT = 5000");
};

export { createIndexJSFile, createENVFile };
