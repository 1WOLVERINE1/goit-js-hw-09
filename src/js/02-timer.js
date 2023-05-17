import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const pickrInputRef = document.getElementById('datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
btnStartRef.setAttribute('disabled', true);
const divTimerRef = document.querySelector('.timer');
const divFieldRef = document.querySelectorAll('.field');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let timerInterval = null;

divTimerRef.style.display = 'flex';
divFieldRef.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.textAlign = 'center';
  field.style.margin = '3px';
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function viewOnScreen(obj) {
  daysRef.textContent = addLeadingZero(obj.days);
  hoursRef.textContent = addLeadingZero(obj.hours);
  minutesRef.textContent = addLeadingZero(obj.minutes);
  secondsRef.textContent = addLeadingZero(obj.seconds);
}
function timer(chooseDate) {
  const currentDate = new Date();
  const countTimer = convertMs(chooseDate.getTime() - currentDate.getTime());
  viewOnScreen(countTimer);
  if (
    countTimer.days === 0 &&
    countTimer.hours === 0 &&
    countTimer.minutes === 0 &&
    countTimer.seconds === 0
  ) {
    clearInterval(timerInterval);
    daysRef.textContent = padStart(0);
    hoursRef.textContent = padStart(0);
    minutesRef.textContent = padStart(0);
    secondsRef.textContent = padStart(0);
  }
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseDate = selectedDates[0];
    const currentDate = new Date();
    if (chooseDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Date is correct');
      btnStartRef.removeAttribute(`disabled`, true);
      btnStartRef.addEventListener('click', startTimer);
      function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => timer(chooseDate), 1000);
        btnStartRef.setAttribute(`disabled`, true);
      }
    }
  },
};
const fp = flatpickr(pickrInputRef, options);
