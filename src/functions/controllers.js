import fs from "fs";
import path from "path";
import shelljs from "shelljs";

/**
 * Creation of controllers Project folder with controller files
 */

const createControllerFolderAndCD = async () => {
  // 1. create controller folder
  await fs.mkdirSync(path.join(process.cwd(), "controller"), {
    recursive: true,
  });

  // 2. Change working directory into Project Foler
  await process.chdir(path.join(process.cwd(), "controller"));
};

const createControllerFiles = async (controllerName) => {
  await fs.writeFileSync(controllerName + ".js", "");
};

export { createControllerFolderAndCD, createControllerFiles };
