"use strict";

const express = require("express");
require("dotenv").config();
const weatherData = require("./data/weather.json");
const server = express();
const cors = require("cors");
const PORT = process.env.PORT;
let arrayOfObjects = [];

server.use(cors());

// http://localhost:3010/
server.get("/", (request, response) => {
  response.send("Hello from the server");
});

// http://localhost:3010/weather?q=<cityname>&lon=<the_longitude>&lat=<the_latitude>
server.get("/weather", (request, response) => {
  let name = request.query.q;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  let lon = request.query.lon;
  let lat = request.query.lat;

  let weatherArr = weatherData.find((element) => name == element.city_name);
  let dataArray = weatherArr.data.map((element) => {
    let obj = {};
    obj.date = element.datetime;
    obj.description = element.weather.description;
    return obj;
  });

  // class Forecast {
  //   constructor(date, description) {
  //     this.date = date;
  //     this.description = description;
  //     arrayOfObjects.push(this);

  //   }
  // }

  response.send(dataArray);
});

server.get("*", (req, res) => {
  res.status(404).send("page not found");
});

server.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
