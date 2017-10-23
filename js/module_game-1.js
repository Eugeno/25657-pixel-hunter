import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleIntro from './module_intro';
import getRandomGameModule from './render-random-game';
import {Answer} from './game-data';
import getStats from './module_stats';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import getRandomImage from './get-random-image';
import {initialState, currentState} from './data';

const moduleGame1 = () => getElementFromTemplate(`${headerTemplate(currentState)}
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
      ${statsTemplate(currentState)}
    </div>
  </div>
${footerTemplate}`);

const getGame1 = () => {
  renderBlock(moduleGame1());

  const form = document.querySelector(`.game__content`);
  const countChecked = () => {
    return form.querySelectorAll(`input[type="radio"]:checked`).length;
  };

  const gameOptions = [...form.querySelectorAll(`.game__option`)];

  const tasks = gameOptions.length;
  form.addEventListener(`change`, () => {
    if (countChecked() === tasks) {
      let answer = Answer.CORRECT;
      gameOptions.forEach((t) => {
        if (t.querySelector(`img`).dataset.type !== t.querySelector(`input[type="radio"]:checked`).value) {
          answer = Answer.WRONG;
        }
      });
      if (answer === Answer.WRONG) {
        currentState.lives--;
      }
      currentState.answers.push(answer);
      if (currentState.level < 10 && currentState.lives > 0) {
        currentState.level++;
        getRandomGameModule();
      } else {
        getStats();
      }
    }
  });
  document.querySelector(`.back`).addEventListener(`click`, () => {
    currentState.lives = initialState.lives;
    currentState.time = initialState.time;
    currentState.answers = [];
    currentState.level = initialState.level;
    renderBlock(moduleIntro);
  });

  const img1 = gameOptions[0].querySelector(`img`);
  const img2 = gameOptions[1].querySelector(`img`);
  const imgData1 = getRandomImage();
  let imgData2 = getRandomImage();
  img1.src = imgData1.imageUrl;
  img1.dataset.type = imgData1.type;
  while (imgData1.imageUrl === imgData2.imageUrl) {
    imgData2 = getRandomImage();
  }
  img2.src = imgData2.imageUrl;
  img2.dataset.type = imgData2.type;
};

export default getGame1;
