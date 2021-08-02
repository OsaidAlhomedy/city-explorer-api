"use strict";

const { request, response } = require("express");
const express = require("express");
require("cors");
require("dotenv").config();
const server = express();
const PORT = process.env.PORT;

// http://localhost:3010/
server.get("/", (request, response) => {
  response.send("Hello from the server");
});

server.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
