const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
let intervalId = null;

btnStartRef.addEventListener('click', clickOnStart);
function clickOnStart() {
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStopRef.addEventListener('click', clickOnStop);
function clickOnStop() {
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
