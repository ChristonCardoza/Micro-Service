const express = require("express");

const { PORT } = require("./config");
const expressApp = require("./express-app");
const { DatabaseConnection } = require("./database");

const { CreateChannel } = require("./utils");

const StartServer = async () => {
  const app = express();

  await DatabaseConnection();

  const channel = await CreateChannel();

  await expressApp(app, channel);

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
