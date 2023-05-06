localStorageHandler();
localStoragePluginsHandler();

const playListArray = [
  {
    title: "Aqua Caelestis",
    src: "./assets/sounds/Aqua Caelestis.mp3",
    duration: "00:58",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio Morricone.mp3",
    duration: "01:37",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River Flows In You.mp3",
    duration: "01:37",
  },
  {
    title: "Summer Wind",
    src: "./assets/sounds/Summer Wind.mp3",
    duration: "01:50",
  },
];

window.onload = function () {
  /** Slider **/
  showNextSlideHandler();
  showPrevSlideHandler();
  setBackgroundImage();
  /** Time **/
  showTime();
  /** Weather **/
  setWeatherSity();
  getWeather();
  /** Quotes **/
  getQuotes();
  reloadQuoteHandler();
  /** Player **/
  showPlayList();
  playButtonHandler();
  pauseButtonHandler();
  nextTrackHandler();
  prevTrackHandler();
  /** Settings */
  settingsHandler();
  showAudioItem();
  showAudioItemHandler();
  showWeatherItem();
  showWeatherItemHandler();
  showQuotesItem();
  showQuotesItemHandler();
};

/** Slider **/

let RANDOM_NUMBER = getRandomNumber();

function getRandomNumber() {
  let random = Math.floor(Math.random() * (21 - 1) + 1);
  return random;
}

function setBackgroundImage() {
  const time = getTimeOfDay();
  const img = new Image();
  img.src = `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${
    time[0]
  }/${String(RANDOM_NUMBER).padStart(2, "0")}.jpg?raw=true`;
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
  const date = new Date();
  const time = date.getHours();
  if (time >= 6 && time < 12) return ["morning", time];
  if (time >= 12 && time <= 17) return ["afternoon", time];
  if (time > 17 && time < 24) return ["evening", time];
  if (time === 24 || time < 6) return ["night", time];
}

function showTimeOfDay() {
  const time = getTimeOfDay();
  document.querySelector(".greeting").textContent = `Good ${time[0]}`;
}

/** Set LocalStorage */
function setLocalStoragePlugins() {
  const audioitem = document.querySelector(".checkbox-audio");
  const weatheritem = document.querySelector(".checkbox-weather");
  const quotesitem = document.querySelector(".checkbox-quotes");

  if (audioitem.checked) {
    localStorage.setItem("audio", true);
  } else localStorage.setItem("audio", false);

  if (weatheritem.checked) {
    localStorage.setItem("weather", true);
  } else localStorage.setItem("weather", false);

  if (quotesitem.checked) {
    localStorage.setItem("quotes", true);
  } else localStorage.setItem("quotes", false);
}

function getLocalStoragePlugins() {
  const audioitem = document.querySelector(".checkbox-audio");
  const weatheritem = document.querySelector(".checkbox-weather");
  const quotesitem = document.querySelector(".checkbox-quotes");

  if (localStorage.getItem("audio") === "true") audioitem.checked = true;
  if (localStorage.getItem("audio") === "false") audioitem.checked = false;

  if (localStorage.getItem("weather") === "true") weatheritem.checked = true;
  if (localStorage.getItem("weather") === "false") weatheritem.checked = false;

  if (localStorage.getItem("quotes") === "true") quotesitem.checked = true;
  if (localStorage.getItem("quotes") === "false") quotesitem.checked = false;
}

function localStoragePluginsHandler() {
  window.addEventListener("beforeunload", setLocalStoragePlugins);
  window.addEventListener("load", getLocalStoragePlugins);
}

function setLocalStorage() {
  const name = document.querySelector(".greeting__input");
  const sity = document.querySelector(".weather__sity");
  localStorage.setItem("name", name.value);
  localStorage.setItem("sity", sity.value);
}

function getLocalStorage() {
  const name = document.querySelector(".greeting__input");
  const sity = document.querySelector(".weather__sity");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("sity")) {
    sity.value = localStorage.getItem("sity");
  }
}

function localStorageHandler() {
  window.addEventListener("beforeunload", setLocalStorage);
  window.addEventListener("load", getLocalStorage);
}

/** Weather */

async function getWeather() {
  if (localStorage.getItem("sity")) {
    const sity = document.querySelector(".weather__sity");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sity.value}&lang=en&appid=2c7a15d52fecce72f232d83719afee73&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    getWeatherIcon(data);
    getWeatherTemperature(data);
    getWeatherDescription(data);
    getWeatherWind(data);
    getWeatherHumidity(data);
  } else {
    document.querySelector(".weather__icon").className = "weather__icon owf";
    document.querySelector(".weather__temperature").textContent = "";
    document.querySelector(".weather__description").textContent = "";
    document.querySelector(".weather__wind").textContent = "";
    document.querySelector(".weather__humidity").textContent = "";
  }
}

function getWeatherIcon(data) {
  const time = getTimeOfDay();
  let typeOfIcon = "";
  if ((time[1] >= 0 && time[1] <= 5) || time[1] >= 22) typeOfIcon = "-n";
  else typeOfIcon = "-d";
  const weatherIcon = document.querySelector(".weather__icon");
  weatherIcon.className = "weather__icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}${typeOfIcon}`);
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
  document.querySelector(".weather__sity").addEventListener("change", () => {
    setLocalStorage();
    getWeather();
  });
}

/** Quotes */

async function getQuotes() {
  let options = {
    method: "GET",
    headers: { "x-api-key": "WVYb0c8eSyyOYf/COaTGhQ==LxDRu876UbIxIRap" },
  };

  let url = "https://api.api-ninjas.com/v1/quotes?category=happiness";
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      setQuote(data);
      setAuthor(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function setQuote(data) {
  document.querySelector(".quote").textContent = `"${data[0].quote}"`;
}

function setAuthor(data) {
  document.querySelector(".author").textContent = data[0].author;
}

function reloadQuoteHandler() {
  const reloadButton = document.querySelector(".reload");
  reloadButton.addEventListener("click", () => {
    reloadButton.classList.toggle("rotate");
    getQuotes();
  });
}

/** Player */

let CURRENT_TRACK_INDEX = 0;

function showPlayList() {
  const playList = document.querySelector(".play-list");
  playListArray.forEach((track) => {
    const playListItem = document.createElement("li");
    playListItem.className = "play-list__item";
    playListItem.textContent = track.title;
    playList.append(playListItem);
  });
}

function playAudio() {
  const audio = document.querySelector(".audio");
  audio.src = playListArray[CURRENT_TRACK_INDEX].src;
  audio.currentTime = 0;
  audio.play();
}

function pauseAudio() {
  const audio = document.querySelector(".audio");
  audio.pause();
}

function playButtonHandler() {
  document.querySelector(".play").addEventListener("click", () => {
    removeButtonPlay();
    showButtonPause();
    showCurrentTrackItem();
    playAudio();
    console.log(CURRENT_TRACK_INDEX);
  });
}

function pauseButtonHandler() {
  document.querySelector(".pause").addEventListener("click", () => {
    removeButtonPause();
    showButtonPlay();
    pauseAudio();
  });
}

function nextTrackHandler() {
  document.querySelector(".play-next").addEventListener("click", () => {
    CURRENT_TRACK_INDEX++;
    removePrevTrackItem();
    if (CURRENT_TRACK_INDEX > playListArray.length - 1) CURRENT_TRACK_INDEX = 0;
    removeButtonPlay();
    showButtonPause();
    showCurrentTrackItem();
    playAudio();
  });
}

function prevTrackHandler() {
  document.querySelector(".play-prev").addEventListener("click", () => {
    CURRENT_TRACK_INDEX--;
    removeNextTrackItem();
    if (CURRENT_TRACK_INDEX < 0) CURRENT_TRACK_INDEX = playListArray.length - 1;
    removeButtonPlay();
    showButtonPause();
    showCurrentTrackItem();
    playAudio();
  });
}

function showCurrentTrackItem() {
  const playListItem = document.querySelectorAll(".play-list__item");
  playListItem[CURRENT_TRACK_INDEX].classList.add("active-track");
}

function removePrevTrackItem() {
  const playListItem = document.querySelectorAll(".play-list__item");
  if (CURRENT_TRACK_INDEX <= playListArray.length)
    playListItem[CURRENT_TRACK_INDEX - 1].classList.remove("active-track");
}

function removeNextTrackItem() {
  const playListItem = document.querySelectorAll(".play-list__item");
  playListItem[CURRENT_TRACK_INDEX + 1].classList.remove("active-track");
}

function showButtonPlay() {
  const play = document.querySelector(".play");
  showButton(play);
}

function removeButtonPlay() {
  const play = document.querySelector(".play");
  removeButton(play);
}

function showButtonPause() {
  const pause = document.querySelector(".pause");
  showButton(pause);
}

function removeButtonPause() {
  const pause = document.querySelector(".pause");
  removeButton(pause);
}

function showButton(button) {
  button.style.opacity = 1;
  button.style.width = 50 + "px";
}

function removeButton(button) {
  button.style.opacity = 0;
  button.style.width = 0;
}

/** Settings */

function settingsHandler() {
  const div = document.querySelector(".settings");
  const gear = document.querySelector(".settings__icon");
  document.addEventListener("click", (e) => {
    const withinBoundaries = e.composedPath().includes(div);
    const withinBoundariesGear = e.composedPath().includes(gear);
    if (withinBoundariesGear) {
      gear.classList.toggle("rotate");
      div.classList.toggle("open");
      document.querySelector('.todo').classList.remove('open')
      document.querySelector('.popup').classList.remove('open')
      document.querySelector('.todo-icon').classList.remove('open')
    } else if (div.classList.contains("open")) {
      if (!withinBoundaries) {
        gear.classList.toggle("rotate");
        div.classList.remove("open");
      }
    }
  });
}

function showAudioItemHandler() {
  document
    .querySelector(".label__input-audio")
    .addEventListener("click", showAudioItem);
}

function showWeatherItemHandler() {
  document
    .querySelector(".label__input-weather")
    .addEventListener("click", showWeatherItem);
}

function showQuotesItemHandler() {
  document
    .querySelector(".label__input-quotes")
    .addEventListener("click", showQuotesItem);
}

function showAudioItem() {
  if (!document.querySelector(".checkbox-audio").checked) {
    document.querySelector(".player").classList.add("closed");
  } else document.querySelector(".player").classList.remove("closed");
}

function showWeatherItem() {
  if (!document.querySelector(".checkbox-weather").checked) {
    document.querySelector(".weather").classList.add("closed");
  } else document.querySelector(".weather").classList.remove("closed");
}

function showQuotesItem() {
  if (!document.querySelector(".checkbox-quotes").checked) {
    document.querySelector(".quotes").classList.add("closed");
  } else document.querySelector(".quotes").classList.remove("closed");
}
