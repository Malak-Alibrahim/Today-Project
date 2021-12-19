// a831eca6f4ec47aa8b3c8e4219d4c64d
let lat;
let lon;
let key = "a831eca6f4ec47aa8b3c8e4219d4c64d";
let city = document.querySelector(".city");
let time = document.querySelector(".time");
let tempValue = document.querySelector(".value");
let tempDescription = document.querySelector(".description");
let weatherIcon = document.querySelector(".weather-icon-img");
const weatherButton = document.getElementById("weatherButton");
const weatherInput = document.getElementById("weatherInput");
let windSpeed = document.querySelector(".windSpeed");
let humidity = document.querySelector(".humidity");

// SEARCH FOR SPECIFIC CITY
weatherButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(weatherInput.value);
  weatherInput.value = "";
});

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}`
    );
    const weatherData = await response.json();
    console.log(weatherData.data[0].city_name);
    
    const {city_name, temp, datetime, wind_spd, rh} = weatherData.data[0];
    const {description, icon} = weatherData.data[0].weather;
    
    city.textContent = city_name; //TODO: city name doesn't change - fix it
    time.textContent = datetime; //TODO: date doesn't change - fix it
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
    tempValue.textContent = Math.floor(temp) + "°C";
    tempDescription.textContent = description;
    windSpeed.textContent = wind_spd + " m/s";
    humidity.textContent = rh + "%";   
  } catch (error) {
    alert("City not found");
  }
};

// SHOW CURRENT WEATHER WHEN USER OPEN THE PAGE
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;   
      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.data[0]. city_name);
          const {city_name, temp, datetime, wind_spd, rh} = data.data[0];
          const {description, icon} = data.data[0].weather;
          
          city.textContent = city_name;
          time.textContent = datetime;
          weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
          tempValue.textContent = Math.floor(temp) + "°C";
          tempDescription.textContent = description;
          windSpeed.textContent = wind_spd + " m/s";
          humidity.textContent = rh + "%";         
        });
    });
  }
});
