import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getRandomGameModule from './get-random-game-module';
import moduleStats from './module_stats';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {initialState, currentState} from './data';

const moduleGame3 = getElementFromTemplate(`${headerTemplate(currentState)}
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
      ${statsTemplate(currentState)}
    </div>
  </div>
${footerTemplate}`);

const options = [...moduleGame3.querySelectorAll(`.game__option`)];
options.forEach((option) => {
  option.addEventListener(`click`, () => {
    currentState.level++;
    if (currentState.level < 10) {
      getRandomGameModule();
    } else {
      renderBlock(moduleStats);
    }
  });
});
moduleGame3.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleGame3;
