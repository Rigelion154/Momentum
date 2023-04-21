window.onload = function () {

    showNextSlideHandler()
    showPrevSlideHandler()
    setBackgroundImage()

    showTime()
}

/** Slider ***/

let RANDOM_NUMBER = getRandomNumber()

function getRandomNumber() {
    let random = Math.floor(Math.random() * (21 - 1) + 1)
    return random
}

function setBackgroundImage() {
    const img = new Image();
    img.src = `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/evening/${String(RANDOM_NUMBER).padStart(2, '0')}.jpg?raw=true`
    img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`
    };
}

function getSlideNext() {
    RANDOM_NUMBER++
    if (RANDOM_NUMBER > 20) RANDOM_NUMBER = 1
    console.log(RANDOM_NUMBER)
    setBackgroundImage()
}

function getSlidePrev() {
    RANDOM_NUMBER--
    if (RANDOM_NUMBER < 1) RANDOM_NUMBER = 20
    console.log(RANDOM_NUMBER)
    setBackgroundImage()
}

function showNextSlideHandler () {
    document.querySelector(".slide-next").addEventListener('click', getSlideNext)
}

function showPrevSlideHandler() {
    document.querySelector(".slide-prev").addEventListener('click', getSlidePrev)
}

/** Time **/

function showTime () {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    document.querySelector('.time').textContent = currentTime
    showDate()
    setTimeout(showTime,  1000)
}

/** Date **/

function showDate () {
    const date = new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US',options)
    document.querySelector('.date').textContent = currentDate
}













