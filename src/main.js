import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import shelljs from "shelljs";

const access = promisify(fs.access);
const copy = promisify(ncp);
