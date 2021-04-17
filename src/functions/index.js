import fs from "fs";
import path from "path";

const createIndexJSFile = async (view) => {
  await fs.writeFileSync(
    "index.js",
    `const express = require("express");
    \nconst logger = require("morgan");
    \nconst mongoose = require("mongoose");
    \nconst cors = require("cors");
    \nconst hpp = require("hpp");
    \nconst path = require("path");
    \nconst dotenv = require("dotenv");
    \n\n

    \ndotenv.config();
    \n
    \nconst app = express();

    \n// Middlewares
    \napp.use(cors());
    \napp.use(express.json());
    \napp.use(hpp());
    \napp.use(logger("dev"));
    \napp.use(express.static(path.join(__dirname, "public")));

    \n\n
    app.set("view engine", ${view});\n
    app.set("views", path.join(__dirname, "views"));
    \n\n\n
    \nconst port = process.env.PORT || 3000;
    \nlet  server = app.listen(port, () => {
        console.log('Server started running');
      });
    `
  );
};

const createENVFile = async () => {
  await fs.writeFileSync(".env", "PORT = 5000");
};

export { createIndexJSFile, createENVFile };
