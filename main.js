const apiKey = "50dgN5MQaiwhJlmSEj6LCvy0inbnZWRc";

let currentUnit = "metric";

function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      getData(data);
      displayCity(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });
}

function getData(data) {
  cityKey = data[0].Key;

  currentConditionsURL = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&details=true`;

  fetch(currentConditionsURL)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });
}

function displayCity(data) {
  const cityDivInfo = document.getElementById("location-div");

  cityDivInfo.textContent = data[0].LocalizedName; // Display the city name
}

function toggleUnit() {
  const unitButton = document.getElementById("unit-button");

  if (currentUnit === "metric") {
    unitButton.textContent = "Imperial";
    currentUnit = "imperial";
  } else {
    unitButton.textContent = "Metric";
    currentUnit = "metric";
  }
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const windspeedDivInfo = document.getElementById("windspeed-div");

  if (currentUnit === "metric") {
    const temperature = data[0].Temperature.Metric.Value;
    const windSpeed = data[0].Wind.Speed.Metric.Value;

    tempDivInfo.textContent = `${temperature}°C`;
    windspeedDivInfo.textContent = `${windSpeed} km/h`;
  } else {
    const temperature = data[0].Temperature.Imperial.Value;
    const windSpeed = data[0].Wind.Speed.Imperial.Value;

    tempDivInfo.textContent = `${temperature}°F`;
    windspeedDivInfo.textContent = `${windSpeed} mp/h`;
  }
}
