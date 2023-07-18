
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let intervalId = null;
let isActive = false;

startBtn.addEventListener('click', changeColor);

function changeColor() {
  if (isActive) {
    return;
  }
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(() => {
    isActive = true;
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
    console.log(randomColor);
  }, 1000);
}

stopBtn.addEventListener('click', stopChangeColor);

function stopChangeColor() {
  clearInterval(intervalId);
  isActive = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
