import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleGame1 from './module_game-1';
import moduleGame2 from './module_game-2';
import moduleGame3 from './module_game-3';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import {initialState, currentState} from './data';

const moduleRules = getElementFromTemplate(`${headerTemplate(currentState)}
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button continue" type="submit" disabled>Go!</button>
    </form>
  </div>
${footerTemplate}`);

const input = moduleRules.querySelector(`.rules__input`);
const rulesBtn = moduleRules.querySelector(`.rules__button`);
input.addEventListener(`input`, ({target}) => {
  rulesBtn.disabled = !target.value.trim();
});
moduleRules.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;
const renderRandomGame = () => {
  const gameModule = parseInt(getRandomArbitrary(1, 4), 10);
  switch (gameModule) {
    case 1:
      renderBlock(moduleGame1);
      break;
    case 2:
      renderBlock(moduleGame2);
      break;
    case 3:
      renderBlock(moduleGame3);
      break;
  }
};
rulesBtn.addEventListener(`click`, () => {
  renderRandomGame();
  currentState.level = 1;
});

export default moduleRules;
