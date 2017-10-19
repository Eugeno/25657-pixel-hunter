import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleGame1 from './module_game-1';
import moduleGame2 from './module_game-2';
import moduleStats from './module_stats';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {initialState, currentState} from './data';

const moduleGame3 = getElementFromTemplate(`${headerTemplate(initialState)}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      ${statsTemplate(initialState)}
    </div>
  </div>
${footerTemplate}`);

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
const options = [...moduleGame3.querySelectorAll(`.game__option`)];
options.forEach((option) => {
  option.addEventListener(`click`, () => {
    currentState.level++;
    if (currentState.level < 10) {
      renderRandomGame();
    } else {
      renderBlock(moduleStats);
    }
  });
});
moduleGame3.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleGame3;
