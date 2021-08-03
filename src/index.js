let apiKey = "3e16368d310a4a748a9140941213007";
let apiUrl = `https://api.weatherapi.com/v1/current.json?`;
let units = "imperial";
let lat = 0.0;
let long = 0.0;
let cityName = "name";

function dateTime(response) {
  let info = response.data.datetime;
  let indexSpace = info.indexOf(" ");

  let date = info.slice(0, indexSpace);
  document.getElementById("theDate").innerHTML = date;

  let time = info.slice(indexSpace, info.length - 3);
  document.getElementById("theTime").innerHTML = time;
}

let form = document.querySelector("#form");
form.addEventListener("click", searching);

function searching(event) {
  event.preventDefault();
  let searchVal = document.querySelector("#search");
  cityName = searchVal.value;
  document.querySelector("#city").innerHTML = `${cityName}`;
  axios.get(`${apiUrl}key=${apiKey}&q=${cityName}`).then(showWeatherInfo);
}

let searchLocationButton = document.querySelector("#currentLocationButton");
searchLocationButton.addEventListener("click", startGeoLoc);

function startGeoLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocSearch);
}

function currentLocSearch(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  axios.get(`${apiUrl}key=${apiKey}&q=${lat},${long}`).then(showWeatherInfo);
}

function wIcon(response) {
  //console.log(response);
  let weatherImage = document.querySelector("#weatherIcon");
  weatherImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

/*function sunInfo(response) {
  let sunRiseTimeStamp = Math.round(response.data.sys.sunrise);
  let sunrise = calculateTime(sunRiseTimeStamp);
  document.querySelector("#sr").innerHTML = `${sunrise}`;

  let sunSetTimeStamp = Math.round(response.data.sys.sunset);
  let sunset = calculateTime(sunSetTimeStamp);
  document.querySelector("#ss").innerHTML = `${sunset}`;
}*/

let rfeel = 10;

function realFeel(response) {
  rfeel = Math.round(response.data.main.feels_like);
  document.querySelector("#real-feel").innerHTML = `${rfeel}`;
  document.querySelector("#thermometer").innerHTML = "🌡️ ";
  document.querySelector("#rf").innerHTML = "°F";
  document.querySelector("#realfeel").innerHTML = "REAL FEEL";
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="forecastTitle">4-Day Forecast
  </div><div class="row">`;

  let days = ["Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3 dayOne">
      <span class="forecastDay" id="dayOneWords">${day}</span>
      <div>
        <img class="forecastImg" src="http://openweathermap.org/img/wn/01d@2x.png" alt="sun" id="dayOneImg">
      </div>
      <div class="forecastTemps">
        <span class="forecastHigh" id="dayTwoLo">82°▲</span>
        <span class="forecastLow" id="dayOneLo"> 71°▼</span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherInfo(response) {
  //console.log(response);
  cityName = response.data.location.name;
  document.querySelector("#city").innerHTML = `${cityName}`;
  let lat = response.data.location.lat;
  let lon = response.data.location.lon;
  let apiKeyTZ = "3ae99f7a70154b41a980cb925a17a548";

  fTemp = Math.round(response.data.current.temp_f);

  axios
    .get(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKeyTZ}&location=${lat},${lon}`
    )
    .then(dateTime);

  let temperature = Math.round(response.data.current.temp_f);
  let tempElement = document.querySelector("#currTemp");
  tempElement.innerHTML = `${temperature}`;

  let apiKey = "eb3465c9163b23fae63aa1202c8a0eb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  let wdescription = response.data.current.condition.text;
  document.querySelector("#weather-description").innerHTML = `${wdescription}`;

  axios.get(`${apiUrl}`).then(wIcon);
  //axios.get(`${apiUrl}`).then(sunInfo);
  axios.get(`${apiUrl}`).then(realFeel);

  let prec = response.data.current.precip_in;
  document.querySelector("#precip").innerHTML = `${prec}`;
  document.querySelector("#drop").innerHTML = "💧 ";
  document.querySelector("#inch").innerHTML = "in";
  document.querySelector("#pr").innerHTML = "PRECIPITATION";

  let wind = Math.round(response.data.current.wind_mph);
  document.querySelector("#windsp").innerHTML = `${wind}`;
  document.querySelector("#flag").innerHTML = "🏳️ ";
  document.querySelector("#mph").innerHTML = "mph";
  document.querySelector("#wind").innerHTML = "WIND";

  let humidity = response.data.current.humidity;
  document.querySelector("#hum").innerHTML = `${humidity}`;
  document.querySelector("#drops").innerHTML = "💦 ";
  document.querySelector("#percent").innerHTML = "%";
  document.querySelector("#humidity").innerHTML = "HUMIDITY";
  showIcons();

  displayForecast();
}

function showIcons() {
  document.querySelector("#flink").innerHTML = "°F";
  document.querySelector("#line").innerHTML = "|";
  document.querySelector("#clink").innerHTML = "°C";
  document.querySelector("#degree").innerHTML = "°";
  document.querySelector("#unit-type").innerHTML = "F";
}

function calculateTime(timeStamp) {
  let d = new Date(timeStamp * 1000);
  let hour = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  return `${hour}:${min}`;
}

function showCelsius(event) {
  event.preventDefault();
  flink.classList.remove("active");
  clink.classList.add("active");
  let celTemp = Math.round((fTemp - 32) / 1.8);
  document.querySelector("#currTemp").innerHTML = celTemp;
  document.querySelector("#unit-type").innerHTML = "C";
}

let clink = document.querySelector("#clink");
clink.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  flink.classList.add("active");
  clink.classList.remove("active");
  document.querySelector("#currTemp").innerHTML = fTemp;
  document.querySelector("#unit-type").innerHTML = "F";
}

let flink = document.querySelector("#flink");
flink.addEventListener("click", showFahrenheit);

let fTemp = null;
