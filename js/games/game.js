import renderBlock from '../render-block';
import repeatGame from '../repeat-game';
import {MAX_ANSWER_TIME, FAST_ANSWER_TIME, SLOW_ANSWER_TIME, Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

const getGame = (state, question, gameBlock) => {
  const tick = () => {
    gameBlock.state.time--;
    if (gameBlock.state.time > 0) {
      gameBlock.onTick();
    } else {
      gameBlock.timeExceed();
    }
  };
  const timer = setInterval(() => {
    tick();
  }, 1000);

  gameBlock.onAnswer = (answers) => {
    clearInterval(timer);
    let answer = Answer.CORRECT;
    const isWrongAnswer = () => question.data.some((t, i) => t.type !== answers[i]);
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
  gameBlock.onBackBtnClick = () => {
    clearInterval(timer);
    repeatGame();
  };
  renderBlock(gameBlock);
};

export default getGame;
