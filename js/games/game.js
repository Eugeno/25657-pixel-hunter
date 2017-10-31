import {changeView} from '../utilities';
import repeatGame from '../repeat-game';
import {AnswerTime, Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

class GameScreen {
  init(state, question, gameBlock) {
    this.view = gameBlock;
    changeView(this.view);

    const tick = () => {
      this.view.state.time--;
      if (this.view.state.time > 0) {
        this.view.onTick();
      } else {
        this.view.timeExceed();
      }
    };
    const timer = setInterval(() => {
      tick();
    }, 1000);

    this.view.onAnswer = (answers) => {
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

    this.view.onBackBtnClick = () => {
      clearInterval(timer);
      repeatGame();
    };
  }
}

export default new GameScreen();
