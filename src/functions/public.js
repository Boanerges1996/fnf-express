import fs from "fs";
import path from "path";

const createPublicFolder = async () => {
  // 1. create public folder
  await fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });

  // 2. Change working directory into public folder
  await process.chdir(path.join(process.cwd(), "public"));
};

const createDefaultPublicFolders = async () => {
  await fs.mkdirSync(path.join(process.cwd(), "images"), {
    recursive: true,
  });
  await fs.mkdirSync(path.join(process.cwd(), "videos"), {
    recursive: true,
  });
  await fs.mkdirSync(path.join(process.cwd(), "audios"), {
    recursive: true,
  });
};

export { createPublicFolder, createDefaultPublicFolders };
