import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getRandomGameModule from './get-random-game-module';
import moduleStats from './module_stats';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import getRandomImage from './get-random-image';
import {currentState} from './data';

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
    let answer = `correct`;
    if (option.querySelector(`img`).dataset.type !== `paint`) {
      answer = `wrong`;
      currentState.lives--;
    }
    currentState.answers[currentState.level - 1] = answer;
    currentState.level++;
    if (currentState.level < 10 && currentState.lives > 0) {
      getRandomGameModule();
    } else {
      renderBlock(moduleStats);
    }
  });
});
moduleGame3.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

const getGame3 = () => {
  options.forEach((t) => {
    const imgData = getRandomImage();
    const img = t.querySelector(`img`);
    img.src = imgData.imageUrl;
    img.dataset.type = imgData.type;
  });
  renderBlock(moduleGame3);
};

export default getGame3;
