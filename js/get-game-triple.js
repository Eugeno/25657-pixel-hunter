import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import footerTemplate from './footer-template';
import headerTemplate from './header-template';
import statsTemplate from './stats-template';
import {Answer} from './data/game-data';
import repeatGame from './repeat-game';
import getNextState from './get-next-state';
import getNextScreen from './get-next-screen';

const gameOptionsTemplate = (state, question) => {
  return question.data.map((q, i) => {
    return `<div class="game__option">
        <img src="${q.src}" alt="Option ${i + 1}" width="304">
      </div>`;
  }).join(``);
};

const moduleGameTriple = (state, question) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Найдите ${question.task.text} среди изображений</p>
    <form class="game__content game__content--triple">
      ${gameOptionsTemplate(state, question)}
    </form>
    <div class="stats">
      ${statsTemplate(state)}
    </div>
  </div>
${footerTemplate}`);

const getGameTriple = (state, question) => {
  renderBlock(moduleGameTriple(state, question));

  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];
  gameOptions.forEach((option, i) => {
    option.addEventListener(`click`, () => {
      let answer = Answer.CORRECT;
      if (question.data[i].type !== question.task.type) {
        answer = Answer.WRONG;
      }
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    });
  });

  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameTriple;
