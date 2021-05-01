import fs from "fs";
import path from "path";

/**
 * Creation of connections to be used in app such as
 * 1. Database connection
 * 2. Socket connection
 */

const createConnectionsFolderAndCD = async () => {
  // 1. create modelFolder
  await fs.mkdirSync(path.join(process.cwd(), "connections"), {
    recursive: true,
  });

  // 2. Change working directory into Project Foler
  await process.chdir(path.join(process.cwd(), "connections"));
};

const createConnectionFile = async () => {
  await fs.writeFileSync(
    "connections.js",
    'const dotenv = require("dotenv"); \
    \nconst mongoose = require("mongoose"); \
    \n\
    dotenv.config();\
    \n\
    mongoose.set("useNewUrlParser", true);\
    \nmongoose.set("useFindAndModify", false);\
    \nmongoose.set("useCreateIndex", true);\
    \nmongoose.set("useUnifiedTopology", true);\
    \n\
    \nconst connectDB = async () => {\
      \nconsole.log(process.env.ENVIRON); \
      \ntry { \
        \nmongoose.connect(\
          \nprocess.env.ENVIRON === "production"\
            ? process.env.MONGODB_REMOTE\
            : process.env.MONGODB_LOCAL,\
          { useNewUrlParser: true, useUnifiedTopology: true },\
          \n() =>\
            console.log(\
              `Connected to ${\
                process.env.ENVIRON === "production"\
                  ? "Production DB"\
                  : "Development DB"\
              }`  \
            )\
        \n);\
      \n} catch (err) {\
        \nconsole.log(err); \
      \n}\
    \n}; \
    \
    //\n const testDB = async () => {\
    //\n   console.log(process.env.ENVIRON);\
    //\n   try { \
    //\n     mongoose.connect( \
    //\n       process.env.MONGODB_REMOTE_TEST,\
    \
    //\n       { useNewUrlParser: true, useUnifiedTopology: true },\
    //\n       () => console.log(`Connected to test Database`)\
    //\n     );\
    //\n   } catch (err) {\
    //\n     console.log(err);\
    //\n   }\
    //\n };\
\
    \n\nmodule.exports = { \
      connectDB,\
      testDB,\
    };'
  );
};

export { createConnectionsFolderAndCD, createConnectionFile };
