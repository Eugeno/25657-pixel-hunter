import GameSingleView from './game-single-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {MAX_ANSWER_TIME, FAST_ANSWER_TIME, SLOW_ANSWER_TIME, Answer, getNextState, createTimer} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGameSingle = (state, question) => {
  const gameSingleBlock = new GameSingleView(state, question);
  let timer = createTimer(MAX_ANSWER_TIME);
  gameSingleBlock.tick = () => {
    timer = timer.tick();
    if (typeof timer === `object`) {
      gameSingleBlock.state.time = timer.value;
      gameSingleBlock.onTick();
      gameSingleBlock.timer = setTimeout(() => {
        gameSingleBlock.tick();
      }, 1000);
    } else {
      gameSingleBlock.timeExceed();
    }
  };
  setTimeout(() => {
    gameSingleBlock.tick();
  }, 1000);

  gameSingleBlock.onAnswer = (answers) => {
    clearTimeout(gameSingleBlock.timer);
    let answer = Answer.CORRECT;
    if (!answers || question.data[0].type !== answers[0]) {
      answer = Answer.WRONG;
    } else {
      if (MAX_ANSWER_TIME - gameSingleBlock.state.time < FAST_ANSWER_TIME) {
        answer = Answer.FAST;
      } else if (MAX_ANSWER_TIME - gameSingleBlock.state.time > SLOW_ANSWER_TIME) {
        answer = Answer.SLOW;
      }
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  gameSingleBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameSingleBlock);
};

export default getGameSingle;
