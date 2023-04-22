window.onload = function () {
  showNextSlideHandler();
  showPrevSlideHandler();
  setBackgroundImage();
  showTime();
  setWeatherSity();
  getWeather();
};
localStorageHandler();

/** Slider ***/

let RANDOM_NUMBER = getRandomNumber();

function getRandomNumber() {
  let random = Math.floor(Math.random() * (21 - 1) + 1);
  return random;
}

function setBackgroundImage() {
  const time = getTimeOfDay();
  const img = new Image();
  img.src = `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${time}/${String(
    RANDOM_NUMBER
  ).padStart(2, "0")}.jpg?raw=true`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  RANDOM_NUMBER++;
  if (RANDOM_NUMBER > 20) RANDOM_NUMBER = 1;
  setBackgroundImage();
}

function getSlidePrev() {
  RANDOM_NUMBER--;
  if (RANDOM_NUMBER < 1) RANDOM_NUMBER = 20;
  setBackgroundImage();
}

function showNextSlideHandler() {
  document.querySelector(".slide-next").addEventListener("click", getSlideNext);
}

function showPrevSlideHandler() {
  document.querySelector(".slide-prev").addEventListener("click", getSlidePrev);
}

/** Time **/

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  document.querySelector(".time").textContent = currentTime;
  showDate();
  showTimeOfDay();
  setTimeout(showTime, 1000);
}

/** Date **/

function showDate() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-US", options);
  document.querySelector(".date").textContent = currentDate;
}

/** Greeting **/

function getTimeOfDay() {
  const greeting = document.querySelector(".greeting");
  const date = new Date();
  const time = date.getHours();
  if (time >= 6 && time < 12) return "morning";
  if (time >= 12 && time <= 17) return "afternoon";
  if (time > 17 && time < 24) return "evening";
  if (time === 24 || time < 6) return "night";
}

function showTimeOfDay() {
  const time = getTimeOfDay();
  document.querySelector(".greeting").textContent = `Good ${time}`;
}

/** Set LocalStorage Name */

function setLocalStorageName() {
  const name = document.querySelector(".greeting__input");
  localStorage.setItem("name", name.value);
}

function getLocalStorage() {
  const name = document.querySelector(".greeting__input");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

function localStorageHandler() {
  window.addEventListener("beforeunload", setLocalStorageName);
  window.addEventListener("load", getLocalStorage);
}

/** Weather */

async function getWeather() {
  const sity = document.querySelector(".weather__sity");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${sity.value}&lang=en&appid=2c7a15d52fecce72f232d83719afee73&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  getWeatherIcon(data);
  getWeatherTemperature(data);
  getWeatherDescription(data);
  getWeatherWind(data);
  getWeatherHumidity(data);
}
function getWeatherIcon(data) {
  const weatherIcon = document.querySelector(".weather__icon");
  weatherIcon.className = "weather__icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}
function getWeatherTemperature(data) {
  document.querySelector(".weather__temperature").textContent = `${Math.ceil(
    data.main.temp
  )} °C`;
}
function getWeatherDescription(data) {
  document.querySelector(
    ".weather__description"
  ).textContent = `${data.weather[0].description}`;
}
function getWeatherWind(data) {
  document.querySelector(
    ".weather__wind"
  ).textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`;
}
function getWeatherHumidity(data) {
  document.querySelector(
    ".weather__humidity"
  ).textContent = `Humidity: ${Math.ceil(data.main.humidity)}%`;
}
function setWeatherSity() {
  document
    .querySelector(".weather__sity")
    .addEventListener("change", getWeather);
}
