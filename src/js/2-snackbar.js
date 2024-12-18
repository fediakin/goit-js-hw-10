import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import svgXmarkIcon from '../img/xmark.svg';
import svgCheckIcon from '../img/check.svg';

const form = document.querySelector('form');

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const delay = form.elements.delay.value;
  const radioState = form.elements.state.value;

  const promice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promice
    .then(delay => {
      iziToast.show({
        title: 'OK',
        message: `Fulfilled promise in ${delay} ms`,
        backgroundColor: '#59a10d',
        iconUrl: svgCheckIcon,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'ERROR',
        message: `Rejected promise in ${delay} ms`,
        backgroundColor: '#ef4040',
        iconUrl: svgXmarkIcon,
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        position: 'topRight',
      });
    });
  form.reset();
});
