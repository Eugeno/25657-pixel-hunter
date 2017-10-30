import GameDoubleView from './game-double-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameDouble = (state, question) => {
  const gameDoubleBlock = new GameDoubleView(state, question);
  setTimeout(() => {
    gameDoubleBlock.tick();
  }, 1000);
  gameDoubleBlock.onAnswer = () => {
    const form = gameDoubleBlock.element.querySelector(`.game__content`);
    const countChecked = () => form.querySelectorAll(`input[type="radio"]:checked`).length;
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    const tasks = gameOptions.length;
    let answer = Answer.CORRECT;
    if (state.time === 0 || countChecked() === tasks) {
      gameDoubleBlock.stopTimer();
      if (state.time === 0 || gameOptions.some((el, i) => question.data[i].type !== el.querySelector(`input[type="radio"]:checked`).value)) {
        answer = Answer.WRONG;
      }
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    }
  };
  gameDoubleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameDoubleBlock);
};

export default getGameDouble;
