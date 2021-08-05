"use strict";

const express = require("express");
require("dotenv").config();
const server = express();

const cors = require("cors");
const PORT = process.env.PORT;
const weatherHandle = require("./Modules/weather");
const moviesHandler = require("./Modules/movies");
server.use(cors());

//http://localhost:3010/
server.get("/", (request, response) => {
  response.send("Hello from the server");
});

//http://localhost:3010/weather?q=<cityname>&lon=<the_longitude>&lat=<the_latitude>

server.get("/weather", weatherHandle);

//http://localhost:3010/movies?q=<cityname>

server.get("/movies", moviesHandler);

server.get("*", (req, res) => {
  res.status(404).send("page not found");
});

server.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
