import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getRandomGameModule from './get-random-game-module';
import moduleIntro from './module_intro';
import moduleStats from './module_stats';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {initialState, currentState} from './data';

const moduleGame2 = getElementFromTemplate(`${headerTemplate(initialState)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--wide game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      ${statsTemplate(initialState)}
    </div>
  </div>
${footerTemplate}`);

const form = moduleGame2.querySelector(`.game__content`);
form.addEventListener(`change`, () => {
  currentState.level++;
  if (currentState.level < 10) {
    getRandomGameModule();
  } else {
    renderBlock(moduleStats);
  }
});
moduleGame2.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleGame2;
