import fs from "fs";
import path from "path";
import shelljs from "shelljs";

/**
 * Creation of models in DB
 */

const createModelFolderAndCD = async () => {
  // 1. create modelFolder
  await fs.mkdirSync(path.join(process.cwd(), "models"), {
    recursive: true,
  });

  // 2. Change working directory into Project Foler
  await process.chdir(path.join(process.cwd(), "models"));
};

const createModelFileGivenName = async (modelName) => {
  await fs.writeFileSync(
    modelName + ".js",
    `const mongoose = require("mongoose"); \nconst dotenv = require("dotenv"); \n\nconst ${modelName}Schema = new mongoose.Schema({}) \n\n\n\nmodule.exports = mongoose.model(${modelName}, ${modelName}Schema);`
  );
};

export { createModelFolderAndCD, createModelFileGivenName };
