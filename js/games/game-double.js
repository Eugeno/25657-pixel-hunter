import GameDoubleView from './game-double-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameDouble = (state, question) => {
  const GameDoubleBlock = new GameDoubleView(state, question);
  setTimeout(() => {
    GameDoubleBlock.tick();
  }, 1000);
  GameDoubleBlock.onAnswer = () => {
    const form = GameDoubleBlock.element.querySelector(`.game__content`);
    const countChecked = () => form.querySelectorAll(`input[type="radio"]:checked`).length;
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    const tasks = gameOptions.length;
    let answer = Answer.CORRECT;
    if (state.time === 0 || countChecked() === tasks) {
      GameDoubleBlock.stopTimer();
      if (state.time === 0 || gameOptions.some((el, i) => question.data[i].type !== el.querySelector(`input[type="radio"]:checked`).value)) {
        answer = Answer.WRONG;
      }
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    }
  };
  GameDoubleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(GameDoubleBlock);
};

export default getGameDouble;
