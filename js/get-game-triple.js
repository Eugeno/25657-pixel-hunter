import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {Answer} from './data/game-data';
import repeatGame from './repeat-game';
import finishGameModule from './finish-game-module';

const gameOptionsTemplate = (state, question) => {
  let options = ``;
  for (let i = 0; i < 3; i++) {
    options += `<div class="game__option">
        <img src="${question.data[i].src}" alt="Option ${i + 1}" width="304">
      </div>`;
  }
  return options;
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
  const newState = Object.assign({}, state);

  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];
  gameOptions.forEach((option) => {
    option.addEventListener(`click`, () => {
      let answer = Answer.CORRECT;
      if (question.data[option.querySelector(`img`).getAttribute(`alt`).split(` `)[1] - 1].type !== question.task.type) {
        answer = Answer.WRONG;
        newState.lives--;
      }
      finishGameModule(newState, answer);
    });
  });

  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameTriple;
