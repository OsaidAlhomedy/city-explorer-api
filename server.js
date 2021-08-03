"use strict";

const express = require("express");
require("dotenv").config();
const server = express();
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT;

server.use(cors());

class Forecast {
  constructor(date, desc, low, high) {
    this.date = date;
    this.description = desc;
    this.low = low;
    this.high = high;
  }
}

// http://localhost:3010/
server.get("/", (request, response) => {
  response.send("Hello from the server");
});

// http://localhost:3010/weather?q=<cityname>&lon=<the_longitude>&lat=<the_latitude>

server.get("/weather", weatherHandle);

async function weatherHandle(request, response) {
  let name = request.query.q;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const lon = request.query.lon;
  const lat = request.query.lat;
  const URL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  axios
    .get(URL)
    .then((result) => {
      let weatherData = result.data.data;

      let weatherArray = weatherData.map((n) => {
        return new Forecast(
          n["datetime"],
          n["weather"]["description"],
          n["high_temp"],
          n["low_temp"]
        );
      });
      response.send(weatherArray);
    })
    .catch((err) => {
      response.send(err);
    });
}

server.get("*", (req, res) => {
  res.status(404).send("page not found");
});

server.listen(PORT, () => {
  console.log(`Listening to port:${PORT}`);
});
