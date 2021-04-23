var chalk = require("chalk");

const helpFunction = () => {
  console.log("Usage fnf-express <command>\n");
  console.log(
    chalk.yellow("fnf-express \t\t\t"),
    "Setup express app, by following some instructions"
  );
  console.log(chalk.yellow("fnf-express --help\t\t"), "fnf-express");
};

export { helpFunction };
