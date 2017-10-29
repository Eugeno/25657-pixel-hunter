import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import {Answer, getNextState} from './data/game-data';
import {getNextScreen} from './route-methods';
import footerTemplate from './components/footer';
import headerTemplate from './components/header';
import statsTemplate from './components/stats';
import repeatGame from './repeat-game';

const gameOptionsTemplate = (question) => {
  return question.data.map((q, i) => {
    return `<div class="game__option">
        <img src="${q.src}" alt="Option ${i + 1}" width="468">
        <label class="game__answer game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``);
};

const moduleGameDouble = (state, question) => getElementFromTemplate(`${headerTemplate(state)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">  
      ${gameOptionsTemplate(question)}
    </form>
    <div class="stats">
      ${statsTemplate(state)}
    </div>
  </div>
${footerTemplate}`);

const getGameDouble = (state, question) => {
  renderBlock(moduleGameDouble(state, question));

  const form = document.querySelector(`.game__content`);
  const countChecked = () => {
    return form.querySelectorAll(`input[type="radio"]:checked`).length;
  };

  const gameOptions = [...form.querySelectorAll(`.game__option`)];
  const tasks = gameOptions.length;
  form.addEventListener(`change`, () => {
    if (countChecked() === tasks) {
      const answer = gameOptions.some((el, i) => question.data[i].type !== el.querySelector(`input[type="radio"]:checked`).value) ? Answer.WRONG : Answer.CORRECT;
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    }
  });
  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getGameDouble;
