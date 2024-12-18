import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import svgXmarkIcon from '../img/xmark.svg';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtn.setAttribute('disabled', 'true');
      startBtn.classList.replace('start-btn-active', 'start-btn-disable');
      iziToast.show({
        title: 'Error!',
        titleColor: '#ffffff',
        message: 'Please choose a date in the future!',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        iconUrl: svgXmarkIcon,
        position: 'topRight',
      });
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.classList.replace('start-btn-disable', 'start-btn-active');

      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'true');
  startBtn.classList.replace('start-btn-active', 'start-btn-disable');
  inputDate.setAttribute('disabled', 'true');

  function updateTimer(data) {
    document.querySelector('[data-days]').textContent = String(
      data.days
    ).padStart(2, '0');
    document.querySelector('[data-hours]').textContent = String(
      data.hours
    ).padStart(2, '0');
    document.querySelector('[data-minutes]').textContent = String(
      data.minutes
    ).padStart(2, '0');
    document.querySelector('[data-seconds]').textContent = String(
      data.seconds
    ).padStart(2, '0');
  }

  updateTimer(convertMs(userSelectedDate - Date.now()));

  const timerInterval = setInterval(() => {
    const timeRemaining = convertMs(userSelectedDate - Date.now());
    updateTimer(timeRemaining);

    if (
      timeRemaining.days === 0 &&
      timeRemaining.hours === 0 &&
      timeRemaining.minutes === 0 &&
      timeRemaining.seconds === 0
    ) {
      clearInterval(timerInterval);
      inputDate.removeAttribute('disabled');
    }
  }, 1000);
});
