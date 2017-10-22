import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getRandomGameModule from './get-random-game-module';
import moduleIntro from './module_intro';
import getStats from './module_stats';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import getRandomImage from './get-random-image';
import {currentState} from './data';

const moduleGame2 = () => getElementFromTemplate(`${headerTemplate(currentState)}
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
      ${statsTemplate(currentState)}
    </div>
  </div>
${footerTemplate}`);

const getGame2 = () => {
  renderBlock(moduleGame2());

  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];

  form.addEventListener(`change`, () => {
    let answer = `correct`;
    gameOptions.forEach((t) => {
      if (t.querySelector(`img`).dataset.type !== t.querySelector(`input[type="radio"]:checked`).value) {
        answer = `wrong`;
        currentState.lives--;
      }
    });
    currentState.answers[currentState.level - 1] = answer;
    if (currentState.level < 10 && currentState.lives > 0) {
      currentState.level++;
      getRandomGameModule();
    } else {
      getStats();
    }
  });
  document.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

  gameOptions.forEach((t) => {
    const imgData = getRandomImage();
    const img = t.querySelector(`img`);
    img.src = imgData.imageUrl;
    img.dataset.type = imgData.type;
  });
};

export default getGame2;
