const express = require("express");
const cors = require("cors");

const HandleErrors = require("./utils/error-handler");
const { products, appEvents } = require("./api");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  // Listener
  appEvents(app);

  // Ap
  products(app);

  // Error Handling
  app.use(HandleErrors);
};
