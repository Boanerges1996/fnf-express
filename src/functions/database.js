import inquirer from "inquirer";

const installAndCreateDB = async (options) => {
  if (options.database === "MongoDB") {
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

    // options.models = models.models;
  }
};

export { installAndCreateDB };
