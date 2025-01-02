const express = require("express");
const cors = require("cors");

const HandleErrors = require("./utils/error-handler");
const { customer, products, shopping } = require("./api");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());

  // Api
  customer(app);
  products(app);
  shopping(app);

  // Error Handling
  app.use(HandleErrors);
};
