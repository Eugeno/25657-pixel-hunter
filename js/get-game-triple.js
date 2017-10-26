import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import getStats from './module_stats';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import questions from './main';
import startNewGame from './start-new-game';
import getGameModule from './get-game-module';

const gameOptionsTemplate = (state) => {
  let options = ``;
  for (let i = 0; i < 3; i++) {
    options += `<div class="game__option">
        <img src="${questions[state.level].data[i].src}" alt="Option ${i + 1}" width="304">
      </div>`;
  }
  return options;
};

const moduleGameTriple = (state) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Найдите ${questions[state.level].task.text} среди изображений</p>
    <form class="game__content game__content--triple">
      ${gameOptionsTemplate(state)}
    </form>
    <div class="stats">
      ${statsTemplate(state)}
    </div>
  </div>
${footerTemplate}`);

const getGameTriple = (state) => {
  renderBlock(moduleGameTriple(state));
  const newState = Object.assign({}, state);

  const form = document.querySelector(`.game__content`);
  const gameOptions = [...form.querySelectorAll(`.game__option`)];
  gameOptions.forEach((option) => {
    option.addEventListener(`click`, () => {
      let answer = `correct`;
      if (questions[state.level].data[option.querySelector(`img`).getAttribute(`alt`).split(` `)[1] - 1].type !== questions[state.level].task.type) {
        answer = `wrong`;
        newState.lives--;
      }
      newState.answers.push(answer);
      if (newState.level < 10 && newState.lives > 0) {
        newState.level++;
        getGameModule(newState);
      } else {
        getStats();
      }
    });
  });

  document.querySelector(`.back`).addEventListener(`click`, () => startNewGame);
};

export default getGameTriple;
