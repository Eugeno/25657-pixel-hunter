import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {MAX_ANSWER_TIME, FAST_ANSWER_TIME, SLOW_ANSWER_TIME, Answer, getNextState, createTimer} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGame = (state, question, gameBlock) => {
  let timer = createTimer(MAX_ANSWER_TIME);
  let timeouter;
  gameBlock.tick = () => {
    timer = timer.tick();
    if (typeof timer === `object`) {
      gameBlock.state.time = timer.value;
      gameBlock.onTick();
      timeouter = setTimeout(() => {
        gameBlock.tick();
      }, 1000);
    } else {
      gameBlock.timeExceed();
    }
  };
  setTimeout(() => {
    gameBlock.tick();
  }, 1000);

  gameBlock.onAnswer = (answers) => {
    clearTimeout(timeouter);
    let answer = Answer.CORRECT;
    const isWrongAnswer = () => {
      return question.data.some((t, i) => {
        return t.type !== answers[i];
      });
    };
    if (!answers || isWrongAnswer()) {
      answer = Answer.WRONG;
    } else {
      if (MAX_ANSWER_TIME - gameBlock.state.time < FAST_ANSWER_TIME) {
        answer = Answer.FAST;
      } else if (MAX_ANSWER_TIME - gameBlock.state.time > SLOW_ANSWER_TIME) {
        answer = Answer.SLOW;
      }
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  };
  gameBlock.onBackBtnClick = () => repeatGame();
  renderBlock(gameBlock);
};

export default getGame;
