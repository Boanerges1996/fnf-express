import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import shelljs from "shelljs";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createtemplates(options) {
  // create folder from name option
  await fs.mkdirSync(path.join(process.cwd(), options.name), {
    recursive: true,
  });
  await process.chdir(path.join(process.cwd(), options.name));

  console.log(process.cwd());
  shelljs.exec("npm init --yes");
  shelljs.exec(
    `npm i express nodemon dotenv cors axios morgan ${
      options.db === "MongoDB" ? "mongoose" : ""
    }`
  );
  await fs.mkdirSync(process.cwd() + "/models", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/controller", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/routes", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/public", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/util", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/connections", { recursive: true });
  await fs.mkdirSync(process.cwd() + "/test", { recursive: true });
  await fs.writeFileSync("index.js", "");
  await fs.writeFileSync(".env", "");
}
