import fs from "fs";
import path from "path";

const createViewsFolder = async () => {
  // Creating views folder
  await fs.mkdirSync(path.join(process.cwd(), "views"));
};

export { createViewsFolder };
