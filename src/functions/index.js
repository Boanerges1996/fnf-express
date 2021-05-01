import fs from "fs";
import path from "path";

const createIndexJSFile = async (view) => {
  await fs.writeFileSync(
    "index.js",
    'const express = require("express"); \
  const logger = require("morgan"); \
  const mongoose = require("mongoose");\
  const cors = require("cors"); \
  const hpp = require("hpp"); \
  const path = require("path"); \
  const dotenv = require("dotenv"); \
  \n \
  // Database importation\n \
  const dbServer = require("./connections/connections");\
 \n \
  \ndotenv.config(); \
  \n\n \
  const app = express();\n \
  dbServer.connectDB();\n \
\
  // Middlewares \
  \napp.use(cors()); \
  \napp.use(express.json()); \
  \napp.use(hpp()); \
  \napp.use(logger("dev")); \
  \napp.use(express.static(path.join(__dirname, "public"))); \
\
  \n\n \
  app.set("view engine", "ejs");\
  \napp.set("views", path.join(__dirname, "views"));\
  \n\n \
  const port = process.env.PORT || 3000;\
  let  server = app.listen(port, () => { \
    console.log(`Server running on port ${port}`); \
  }); \
    '
  );
};

const createENVFile = async () => {
  await fs.writeFileSync(
    ".env",
    "ENVIRION=dev\n\nPORT = 5000\n\nMONGODB_REMOTE= \nMONGODB_LOCAL=<DB_name> //Put development Database url here"
  );
};

export { createIndexJSFile, createENVFile };
