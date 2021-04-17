import fs from "fs";

import path from "path";

import shelljs from "shelljs";

const createRootFolderAndChangePath = async (name) => {
  // Create Project Folder
  await fs.mkdirSync(path.join(process.cwd(), name), {
    recursive: true,
  });

  // Change working directory into Project Foler
  await process.chdir(path.join(process.cwd(), name));
};

const runNpmInit = async () => {
  shelljs.exec("npm init --yes");
};

const installMongoose = async () => {
  shelljs.exec("npm i mongoose");
};

export { createRootFolderAndChangePath, runNpmInit, installMongoose };
