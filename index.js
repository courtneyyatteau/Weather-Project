let apiKey = "eb3465c9163b23fae63aa1202c8a0eb5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let units = "imperial";
let lat = 0.0;
let long = 0.0;
let cityName = "name";

let d = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[d.getDay()];

let hour = d.getHours();
let min = d.getMinutes();
if (min < 10) {
  min = "0" + min;
}

document.getElementById("dateTime").innerHTML = `${day} ${hour}:${min}`;

let form = document.querySelector("#form");
form.addEventListener("submit", searching);
let searchLocationButton = document.querySelector("#currentLocationButton");
searchLocationButton.addEventListener("click", startGeoLoc);

function searching(event) {
  event.preventDefault();
  let searchVal = document.querySelector("#search");
  cityName = searchVal.value;
  document.querySelector("#city").innerHTML = `${cityName}`;
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(showWeatherInfo);
}
function startGeoLoc() {
  navigator.geolocation.getCurrentPosition(currentLocSearch);
}

function currentLocSearch(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`)
    .then(showWeatherInfo);
}

function showWeatherInfo(response) {
  cityName = response.data.name;
  document.querySelector("#city").innerHTML = `${cityName}`;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#currTemp");
  tempElement.innerHTML = `${temperature}°F`;
  let wdescription = response.data.weather[0].main;
  document.querySelector("#weather-description").innerHTML = `${wdescription}`;
  let humidity = response.data.main.humidity;
  document.querySelector("#hum").innerHTML = `Humidity: ${humidity}%`;
  let theWind = response.data.wind.gust;
  if (theWind) {
    document.querySelector("#wind").innerHTML = `Wind: ${theWind} mph`;
  } else {
    document.querySelector("#wind").innerHTML = `Wind: unknown mph`;
  }
}
