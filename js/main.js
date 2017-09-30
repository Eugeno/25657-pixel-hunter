const screens = [
  document.getElementById(`greeting`),
  document.getElementById(`rules`),
  document.getElementById(`game-1`),
  document.getElementById(`game-2`),
  document.getElementById(`game-3`),
  document.getElementById(`stats`)
];

const main = document.querySelector(`main`);
let currentScreen;

const changeScreen = (i) => {
  let screenTemplate = screens[i];
  let screenToClone = screenTemplate.content;
  main.innerHTML = ``;
  main.appendChild(screenToClone.cloneNode(true));
  currentScreen = i;
};

document.addEventListener(`keydown`, (event) => {
  const keyName = event.key;
  if (event.altKey) {
    switch (keyName) {
      case `ArrowLeft`:
        if (currentScreen > 0) {
          changeScreen(currentScreen - 1);
        }
        break;
      case `ArrowRight`:
        if (currentScreen < screens.length - 1) {
          changeScreen(currentScreen + 1);
        }
        break;
      default:
        return;
    }
  }
}, false);
