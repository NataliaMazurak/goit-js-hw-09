import Notiflix from 'notiflix';

const form = document.querySelector('.form');

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

form.addEventListener('submit', handleSubmit);

//  Отримуємо значення з інпутів  
function handleSubmit(event) {
  event.preventDefault();
  const firstDelay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);


  const promiseArray = [];
  // створюємо цикл, де на кожній ітерації викликаємо функцію створення промісу,
  for (let i = 0; i < amount; i += 1) {
    const delay = firstDelay + step * i;
    const promise = createPromise(i + 1, delay);
    promiseArray.push(promise);

    promise
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
}

