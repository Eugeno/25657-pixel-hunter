import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleIntro from './module_intro';
import moduleGame2 from './module_game-2';
import moduleGame3 from './module_game-3';
import moduleStats from './module_stats';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {initialState, currentState} from './data';

const moduleGame1 = getElementFromTemplate(`${headerTemplate(initialState)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      ${statsTemplate(initialState)}
    </div>
  </div>
${footerTemplate}`);

const form = moduleGame1.querySelector(`.game__content`);
const countChecked = () => {
  return moduleGame1.querySelectorAll(`input[type="radio"]:checked`).length;
};

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

const tasks = 2;
form.addEventListener(`change`, () => {
  if (countChecked() === tasks) {
    currentState.level++;
    if (currentState.level < 10) {
      renderRandomGame();
    } else {
      renderBlock(moduleStats);
    }
  }
});
moduleGame1.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleGame1;
