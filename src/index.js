let apiKey = "eb3465c9163b23fae63aa1202c8a0eb5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let units = "imperial";
let lat = 0.0;
let long = 0.0;
let cityName = "name";

function dateTime(response) {
  let info = response.data.datetime;
  let indexSpace = info.indexOf(" ");
  let time = info.slice(indexSpace, info.length - 3);
  document.getElementById("dateTime").innerHTML = time;

  /*let d = new Date(time * 1000);
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
  document.getElementById("dateTime").innerHTML = `${day} ${hour}:${min}`;*/
}

let form = document.querySelector("#form");
form.addEventListener("submit", searching);

function searching(event) {
  event.preventDefault();
  let searchVal = document.querySelector("#search");
  cityName = searchVal.value;
  document.querySelector("#city").innerHTML = `${cityName}`;
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=${units}`)
    .then(showWeatherInfo);
}

let searchLocationButton = document.querySelector("#currentLocationButton");
searchLocationButton.addEventListener("click", startGeoLoc);

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
  //console.log(response.data);
  cityName = response.data.name;
  document.querySelector("#city").innerHTML = `${cityName}`;
  let timeInfo = response.data.dt * 1000;
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKeyTZ = "3ae99f7a70154b41a980cb925a17a548";

  axios
    .get(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKeyTZ}&location=${lat},${lon}`
    )
    .then(dateTime);

  let wdescription = response.data.weather[0].main;
  document.querySelector("#weather-description").innerHTML = `${wdescription}`;

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#currTemp");
  tempElement.innerHTML = `${temperature}`;

  //high
  //low

  let rfeel = Math.round(response.data.main.feels_like);
  document.querySelector("#real-feel").innerHTML = `${rfeel}`;

  //precipitation

  //wind

  let humidity = response.data.main.humidity;
  document.querySelector("#hum").innerHTML = `${humidity}`;
}
