import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import footerTemplate from './footer-template';
import headerTemplate from './header-template';
import statsTemplate from './stats-template';
import {Answer} from './data/game-data';
import repeatGame from './repeat-game';
import getNextState from './get-next-state';
import getNextScreen from './get-next-screen';

const moduleGameSingle = (state, question) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      <div class="game__option">
        <img src="${question.data[0].src}" alt="Option 1" width="705">
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

const getGameSingle = (state, question) => {
  renderBlock(moduleGameSingle(state, question));

  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];

  form.addEventListener(`change`, () => {
    let answer = Answer.CORRECT;
    if (question.data[0].type !== gameOptions[0].querySelector(`input[type="radio"]:checked`).value) {
      answer = Answer.WRONG;
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  });
  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameSingle;
