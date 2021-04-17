import shelljs from "shelljs";

const installDefaultPackages = async (views) => {
  await shelljs.exec(
    `npm i express nodemon morgan dotenv bcryptjs hpp jsonwebtoken ${views} socket.io`
  );
};

export { installDefaultPackages };
