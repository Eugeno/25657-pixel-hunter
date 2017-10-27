import getElementFromTemplate from './get-element';
import getIntroBlock from './get-intro-block';
import getGameModule from './get-game-module';
import footerTemplate from './footer-template';
import headerTemplate from './header-template';
import {initialState} from './data/game-data';
import renderBlock from './render-block';

const moduleRules = getElementFromTemplate(`${headerTemplate(initialState)}
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
moduleRules.querySelector(`.back`).addEventListener(`click`, () => getIntroBlock());

rulesBtn.addEventListener(`click`, () => {
  const nextState = Object.assign({}, initialState);
  nextState.answers = JSON.parse(JSON.stringify(initialState.answers));
  getGameModule(nextState);
});

const getRulesBlock = () => renderBlock(moduleRules);

export default getRulesBlock;
