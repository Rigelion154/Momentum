window.onload = function () {
  showNextSlideHandler();
  showPrevSlideHandler();
  setBackgroundImage();
  showTime();
};

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
localStorageHandler();
