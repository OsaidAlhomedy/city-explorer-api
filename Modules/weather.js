const axios = require("axios");
let memoryArray = {};
async function weatherHandle(request, response) {
  let name = request.query.q;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const lon = request.query.lon;
  const lat = request.query.lat;
  const URL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  if (memoryArray[name] !== undefined) {
    response.send(memoryArray[name]);
    console.log("sent from weather Memory");
  } else {
    axios
      .get(URL)
      .then((result) => {
        let weatherData = result.data.data;

        let weatherArray = weatherData.map((n) => {
          return new Forecast(
            n["datetime"],
            n["weather"]["description"],
            n["low_temp"],
            n["high_temp"]
          );
        });
        memoryArray[name] = weatherArray;
        response.send(weatherArray);
        console.log("sent from weather API");
      })
      .catch((err) => {
        response.send(err);
      });
  }
}

class Forecast {
  constructor(date, desc, low, high) {
    this.date = date;
    this.description = desc;
    this.low = low;
    this.high = high;
  }
}

module.exports = weatherHandle;
