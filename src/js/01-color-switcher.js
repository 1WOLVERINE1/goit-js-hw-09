const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
btnStopRef.setAttribute('disabled', true);
let intervalId = null;

btnStartRef.addEventListener('click', clickOnStart);
function clickOnStart() {
  btnStopRef.removeAttribute('disabled');
  btnStartRef.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStopRef.addEventListener('click', clickOnStop);
function clickOnStop() {
  btnStopRef.setAttribute('disabled', true);
  btnStartRef.removeAttribute('disabled');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
