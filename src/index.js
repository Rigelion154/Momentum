window.onload = function () {

}

document.querySelector(".slide-next").addEventListener('click', getSlideNext)
document.querySelector(".slide-prev").addEventListener('click', getSlidePrev)

function getRandomNumber() {
    let random = Math.floor(Math.random() * (21 - 1) + 1)
    return random
}

let RANDOM_NUMBER = getRandomNumber()

function setBg() {
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
    setBg()
}

function getSlidePrev() {
    RANDOM_NUMBER--
    if (RANDOM_NUMBER < 1) RANDOM_NUMBER = 20
    console.log(RANDOM_NUMBER)
    setBg()
}


setBg()


