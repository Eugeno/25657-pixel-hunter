import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getStatsBlock from './get-stats-block';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {Answer, QUESTIONS_LENGTH} from './data/game-data';
import questions from './main';
import repeatGame from './repeat-game';
import getGameModule from './get-game-module';

const moduleGameSingle = (state) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      <div class="game__option">
        <img src="${questions[state.level].data[0].src}" alt="Option 1" width="705" height="455">
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
      ${statsTemplate(state)}
    </div>
  </div>
${footerTemplate}`);

const getGameSingle = (state) => {
  renderBlock(moduleGameSingle(state));
  const newState = Object.assign({}, state);
  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];

  form.addEventListener(`change`, () => {
    let answer = Answer.CORRECT;
    if (questions[state.level].data[0].type !== gameOptions[0].querySelector(`input[type="radio"]:checked`).value) {
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
  });
  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameSingle;
