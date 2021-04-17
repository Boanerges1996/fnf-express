import fs from "fs";
import path from "path";
import shelljs from "shelljs";

/**
 * Creation of routes Project folder with routes files
 */

const createRoutesFolderAndCD = async () => {
  // 1. create routes folder
  await fs.mkdirSync(path.join(process.cwd(), "routes"), {
    recursive: true,
  });

  // 2. Change working directory into Project Foler
  await process.chdir(path.join(process.cwd(), "routes"));
};

const createRoutesFiles = async (routeName) => {
  await fs.writeFileSync(
    routeName + ".js",
    `const router = require("express").Router(); \n\n\nmodule.exports = router;`
  );
};

export { createRoutesFiles, createRoutesFolderAndCD };
