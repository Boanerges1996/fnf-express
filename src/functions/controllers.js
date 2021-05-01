import fs from "fs";
import path from "path";

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
  await fs.writeFileSync(
    controllerName + ".js",
    `// IMPORT PACKAGES TO BE USED HERE (TOP-LEVEL) \n\n// DEFINE CONTROLLER FUNCTIONS HERE \nmodule.exports ={
      // defined controller functions goes here

    }`
  );
};

export { createControllerFolderAndCD, createControllerFiles };
