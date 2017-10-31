import {changeView} from '../utilities';
import repeatGame from '../repeat-game';
import {AnswerTime, Answer, getNextState} from '../data/game-data';
import {getNextScreen} from '../route-methods';

class GameScreen {
  init(state, question, gameBlock) {
    this.view = gameBlock;
    changeView(this.view);

    this.timer = setInterval(() => {
      this.tick();
    }, 1000);

    this.view.onAnswer = (answers) => this.onAnswer(state, question, answers);

    this.view.onBackBtnClick = () => {
      clearInterval(this.timer);
      repeatGame();
    };
  }

  onAnswer(state, question, answers) {
    clearInterval(this.timer);
    let answer = Answer.CORRECT;
    const isWrongAnswer = () => question.data.some((t, i) => t.type !== answers[i]);
    if (!answers || isWrongAnswer()) {
      answer = Answer.WRONG;
    } else {
      if (AnswerTime.MAX - this.view.state.time < AnswerTime.FAST) {
        answer = Answer.FAST;
      } else if (AnswerTime.MAX - this.view.state.time > AnswerTime.SLOW) {
        answer = Answer.SLOW;
      }
    }
    const nextState = getNextState(state, answer);
    getNextScreen(nextState);
  }

  tick() {
    this.view.state.time--;
    if (this.view.state.time > 0) {
      this.view.onTick();
    } else {
      this.view.timeExceed();
    }
  }
}

export default new GameScreen();
