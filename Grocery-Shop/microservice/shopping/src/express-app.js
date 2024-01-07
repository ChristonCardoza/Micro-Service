const express = require("express");
const cors = require("cors");

const HandleErrors = require("./utils/error-handler");
const { shopping, appEvent } = require("./api");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  // Listener
  appEvent(app);

  // Api
  shopping(app);

  // Error Handling
  app.use(HandleErrors);
};
