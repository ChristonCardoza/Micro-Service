const express = require("express");

const { PORT } = require("./config");
const expressApp = require("./express-app");
const { DatabaseConnection } = require("./database");

const StartServer = async () => {
  const app = express();

  await expressApp(app);

  await DatabaseConnection();

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
