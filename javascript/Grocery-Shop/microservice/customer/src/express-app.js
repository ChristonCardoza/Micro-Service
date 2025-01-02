const express = require("express");
const cors = require("cors");

const HandleErrors = require("./utils/error-handler");
const { customer, appEvent } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  //  Listen to Events
  // appEvent(app);

  // Api
  customer(app, channel);

  // Error Handling
  app.use(HandleErrors);
};
