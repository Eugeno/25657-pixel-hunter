import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleGame3 from './module_game-3';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';

const moduleGame2 = getElementFromTemplate(`${headerTemplate}
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
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
${footerTemplate}`);

const inputs = [...moduleGame2.querySelectorAll(`.game__answer`)];
inputs.forEach((input) => {
  input.addEventListener(`click`, () => renderBlock(moduleGame3, `hasFooter`, `hasHeader`));
});
moduleGame2.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleGame2;
