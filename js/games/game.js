import {changeView} from '../utilities';
import repeatGame from '../repeat-game';
import {AnswerTime, Answer, getNextState} from '../data/game-data';
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
      if (AnswerTime.MAX - gameBlock.state.time < AnswerTime.FAST) {
        answer = Answer.FAST;
      } else if (AnswerTime.MAX - gameBlock.state.time > AnswerTime.SLOW) {
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
  changeView(gameBlock);
};

export default getGame;
