import arg from "arg";
import inquirer from "inquirer";
import ora from "ora";
import { createENVFile, createIndexJSFile } from "./functions";
import {
  createControllerFiles,
  createControllerFolderAndCD,
} from "./functions/controllers";
import { validateGithubUrl } from "./functions/git";
import {
  createModelFileGivenName,
  createModelFolderAndCD,
} from "./functions/models";
import { installDefaultPackages } from "./functions/packages";
import {
  createRootFolderAndChangePath,
  installMongoose,
  runNpmInit,
} from "./functions/project";
import {
  createDefaultPublicFolders,
  createPublicFolder,
} from "./functions/public";
import {
  createRoutesFiles,
  createRoutesFolderAndCD,
} from "./functions/routers";
import { createViewsFolder } from "./functions/views";
import {} from "./main";
import path from "path";
import { promisify } from "util";

import ncp from "ncp";
import fs, { readFileSync, writeFileSync } from "fs";
import { Spinner } from "cli-spinner";
import { helpFunction } from "./functions/help";
import { installAndCreateDB } from "./functions/database";
const access = promisify(fs.access);
const copy = promisify(ncp);

const pkg = {};
var view = "";
var projectName = "";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "--database": String,
      "--name": String,
      "--models": String,
      "--ctr": String,
      "--routes": String,
      "--views": String,
      "--help": Boolean,
      "--mfile": String, // For creating modelFile in  MongoDB
      "-mf": "--mfile", // For creating modelFile in  MongoDB
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
      "-db": "--database",
      "-n": "--name",
      "-m": "--models",
      "-c": "--ctr",
      "-r": "--routes",
      "-v": "--views",
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    runInstall: args["--install"] || false,
    db: args["--database"],
    name: args["--name"],
    tags: args["--tags"],
    models: args["--models"],
    controllers: args["--ctr"],
    routes: args["--routes"],
    help: args["--help"] || false,
    mfile: args["--mfile"],
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";
  const defaultDB = "MongoDB";

  const questions = [];

  // Getting project name if it doesn't exist
  // PROJECT NAME
  if (!options.name) {
    const name = await inquirer.prompt([
      {
        type: "string",
        name: "name",
        message: "Please enter name of project ",
      },
    ]);
    if (!name.name) {
      name = await inquirer.prompt([
        {
          type: "string",
          name: "name",
          message: "Please enter name of project, of project ",
        },
      ]);
      projectName = name.name;
    }

    // Await creation of Project name installing of packages
    await createRootFolderAndChangePath(name.name);
    await runNpmInit();
  }

  // If user enters project name
  if (options.name) {
    await createRootFolderAndChangePath(options.name);
    await runNpmInit();
  }

  // DATABASE
  if (!options.db) {
    const db = await inquirer.prompt([
      {
        type: "list",
        name: "database",
        message: "What is your preferred Database",
        choices: ["MongoDB", "MySQL", "Postgres"],
        default: defaultDB,
      },
    ]);

    // Ask models if DB is called MongoDB
    if (db.database === "MongoDB") {
      // Install MONGOOSE
      const spiner = ora();
      spiner.start("installing mongodb as selected database...");
      await installMongoose();
      spiner.stop();
      spiner.succeed();
      // Inputing various mongoDB models in the Project

      // 1. Create Model Folders and CD into IT
      await createModelFolderAndCD();

      // 2. Inputting DB separated by COMMAS
      const models = await inquirer.prompt([
        {
          type: "string",
          name: "models",
          message:
            "Please enter models in project SEPARATED by ',' or press ENTER to move on: ",
          default: "",
        },
      ]);

      // If user enters models
      if (models.models) {
        // If user enters a value for models
        const _models = models.models.split(",");

        _models.map(async (data, index) => {
          if (data) {
            // create file if name is not null
            await createModelFileGivenName(data);
          }
        });
      }

      options.models = models.models;
    }
  }

  if (options.database) {
    await installAndCreateDB(options);
  }

  // CONTROLLERS
  if (!options.controllers) {
    // Change working directory to project folder
    await process.chdir("../");

    // 1. create Controller folder
    await createControllerFolderAndCD();

    const controllers = await inquirer.prompt([
      {
        type: "string",
        name: "controllers",
        message:
          "Please enter controllers in project SEPARATED by ',' or press ENTER to move on: ",
        default: "",
      },
    ]);

    if (controllers.controllers) {
      // If user enters a value for controller
      const _contollers = controllers.controllers.split(",");
      _contollers.map(async (data) => {
        await createControllerFiles(data);
      });
    }
  }

  // ROUTES
  if (!options.routes) {
    // Change working directory to project folder
    await process.chdir("../");
    await createRoutesFolderAndCD();

    const routes = await inquirer.prompt([
      {
        type: "string",
        name: "routes",
        message:
          "Please enter routes in project SEPARATED by ',' or press ENTER to move on: ",
        default: "",
      },
    ]);
    if (routes.routes) {
      // If user enters a value for controller
      const _routes = routes.routes.split(",");
      _routes.map(async (data) => {
        await createRoutesFiles(data);
      });
    }
  }

  //  GIT
  if (!options.git) {
    const git = await inquirer.prompt([
      {
        type: "confirm",
        name: "git",
        message: "Initialize a git repository?",
        default: false,
      },
    ]);

    if (git.git) {
      // If user enters a selects a git type
      // 1. input git url
      const gitUrl = await inquirer.prompt([
        {
          type: "string",
          name: "gitUrl",
          message: "Enter git url: ",
          default: "",
        },
      ]);

      if (gitUrl.gitUrl) {
        // If user enters a github url
        // 1. validate if its valid url
        if (validateGithubUrl(gitUrl)) {
          // Set github repository on package.jjson
          pkg.repository.type = "git";
          pkg.repository.type = gitUrl;
        }
      }
    }
  }

  // PUBLIC
  await process.chdir("../");
  await createPublicFolder();
  await createDefaultPublicFolders();

  // VIEWS
  await process.chdir("../");
  if (!options.views) {
    // Prompt user to enter select a view
    const views = await inquirer.prompt([
      {
        type: "list",
        name: "views",
        message: "Select view type: ",
        choices: ["pug", "ejs", "mustache"],
        default: "",
      },
    ]);
    view = views.views;

    // if a view is selected
    if (views.views) {
      await createIndexJSFile();
      await createENVFile();
      // install default packages
    }

    await createViewsFolder();

    // Show spinner when installing packages
    const spiner2 = ora("Installing default packages ....");
    spiner2.color = "yellow";
    spiner2.start();
    await installDefaultPackages(view);
    spiner2.stop();

    // Changing package.json content
    console.log(process.cwd());
    var packages = await readFileSync("package.json");
    console.log(packages.toString("utf-8"));
    var pack = {
      ...JSON.parse(packages.toString("utf-8")),
      ...pkg,
      scripts: {
        start: "nodemon index.js",
      },
    };

    await writeFileSync("package.json", JSON.stringify(pack));
  }
  //   console.log(answers);
  return {
    ...options,
    // ...answers,
    // template: options.template || answers.template,
    // git: options.git || answers.git,
    // db: options.db || answers.database,
    // name: options.name || answers.name,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);

  // The HELP Option is selected
  if (options.help) {
    helpFunction();
    return;
  } else {
    if (options.mfile) {
      // For creating model file in model folder
      createModelFolderAndCD().then(() => {
        createModelFileGivenName(options.mfile);
      });
      return;
    }
    // if help is not selected
    else {
      options = await promptForMissingOptions(options);
    }
  }

  // options = await promptForMissingOptions(options);
  console.log(options);
  //   await createProject(options);
  //   await createtemplates(options);
}
