import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import {Answer, QUESTIONS_LENGTH} from './data/game-data';
import getStatsBlock from './get-stats-block';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import questions from './main';
import repeatGame from './repeat-game';
import getGameModule from './get-game-module';

const gameOptionsTemplate = (state) => {
  let options = ``;
  for (let i = 0; i < 2; i++) {
    options += `<div class="game__option">
        <img src="${questions[state.level].data[i].src}" alt="Option ${i + 1}" width="468">
        <label class="game__answer game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
  }
  return options;
};

const moduleGameDouble = (state) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">  
      ${gameOptionsTemplate(state)}
    </form>
    <div class="stats">
      ${statsTemplate(state)}
    </div>
  </div>
${footerTemplate}`);

const getGameDouble = (state) => {
  renderBlock(moduleGameDouble(state));
  const newState = Object.assign({}, state);

  const form = document.querySelector(`.game__content`);
  const countChecked = () => {
    return form.querySelectorAll(`input[type="radio"]:checked`).length;
  };

  const gameOptions = [...form.querySelectorAll(`.game__option`)];
  const tasks = gameOptions.length;
  form.addEventListener(`change`, () => {
    if (countChecked() === tasks) {
      let answer = Answer.CORRECT;
      if (gameOptions.some((el, i) => questions[state.level].data[i].type !== el.querySelector(`input[type="radio"]:checked`).value)) {
        answer = Answer.WRONG;
        newState.lives--;
      }
      newState.answers.push(answer);
      newState.level++;
      if (newState.level < QUESTIONS_LENGTH && newState.lives > 0) {
        getGameModule(newState);
      } else {
        getStatsBlock(newState);
      }
    }
  });
  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameDouble;
