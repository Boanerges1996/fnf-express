import fs from "fs";
import path from "path";

const createPublicFolder = async () => {
  // 1. create public folder
  await fs.mkdirSync(path.join(process.cwd(), "public"));

  // 2. Change working directory into public folder
  await process.chdir(path.join(process.cwd(), "public"));
};

const createDefaultPublicFolders = async () => {
  await fs.mkdirSync(path.join(process.cwd(), "images"));
  await fs.mkdirSync(path.join(process.cwd(), "videos"));
  await fs.mkdirSync(path.join(process.cwd(), "audios"));
};

export { createPublicFolder, createDefaultPublicFolders };
