import GameDoubleView from './game-double-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {MAX_ANSWER_TIME, FAST_ANSWER_TIME, SLOW_ANSWER_TIME, Answer, getNextState, createTimer} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameDouble = (state, question) => {
  const gameDoubleBlock = new GameDoubleView(state, question);
  let timer = createTimer(MAX_ANSWER_TIME);
  gameDoubleBlock.tick = () => {
    timer = timer.tick();
    if (typeof timer === `object`) {
      gameDoubleBlock.state.time = timer.value;
      gameDoubleBlock.onTick();
      gameDoubleBlock.timer = setTimeout(() => {
        gameDoubleBlock.tick();
      }, 1000);
    } else {
      gameDoubleBlock.timeExceed();
    }
  };
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
      clearTimeout(gameDoubleBlock.timer);
      if (state.time === 0 || gameOptions.some((el, i) => question.data[i].type !== el.querySelector(`input[type="radio"]:checked`).value)) {
        answer = Answer.WRONG;
      } else {
        if (MAX_ANSWER_TIME - gameDoubleBlock.state.time < FAST_ANSWER_TIME) {
          answer = Answer.FAST;
        } else if (MAX_ANSWER_TIME - gameDoubleBlock.state.time > SLOW_ANSWER_TIME) {
          answer = Answer.SLOW;
        }
      }
      const nextState = getNextState(state, answer);
      getNextScreen(nextState);
    }
  };
  gameDoubleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameDoubleBlock);
};

export default getGameDouble;
