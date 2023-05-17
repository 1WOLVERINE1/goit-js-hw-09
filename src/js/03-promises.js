import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInputRef = document.querySelector(`[name="delay"]`);
const stepInputRef = document.querySelector(`[name="step"]`);
const amountInputRef = document.querySelector(`[name="amount"]`);

form.addEventListener('submit', formSubmit);
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function formSubmit(event) {
  event.preventDefault();
  let amount = parseInt(amountInputRef.value);
  let delay = parseInt(delayInputRef.value);
  let step = parseInt(stepInputRef.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay + step * (position - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
}
