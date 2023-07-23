import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let selectedDate = new Date();


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    startBtn.disabled = selectedDate <= new Date();
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      clearInterval(intervalId);
    }
  },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

startBtn.addEventListener('click', startTimer);

function startTimer() {

  if (selectedDate > new Date()) {
    intervalId = setInterval(() => {
      const startTime = selectedDate.getTime(); 
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      convertMs(deltaTime); //
      if (deltaTime <= 0) {
        clearInterval(intervalId); 
       
        convertMs(0); 
      }
    }, 1000);
  }
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

 
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.innerText = addLeadingZero(days);
  dataHours.innerText = addLeadingZero(hours);
  dataMinutes.innerText = addLeadingZero(minutes);
  dataSeconds.innerText = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

