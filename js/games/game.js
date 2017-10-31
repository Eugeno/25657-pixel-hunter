import Application from '../application';
import {changeView} from '../utilities';
import repeatGame from '../repeat-game';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';
import {QUESTIONS_LENGTH, AnswerTime, Answer, GameType, questions} from '../data/game-data';

class GameScreen {
  init(state) {
    const GameModules = {
      [GameType.SINGLE]: GameSingleView,
      [GameType.DOUBLE]: GameDoubleView,
      [GameType.TRIPLE]: GameTripleView,
    };
    const question = questions[state.level];
    this.view = new GameModules[question.type](state, question);
    changeView(this.view);

    this.timer = setInterval(() => {
      this.tick();
    }, 1000);

    this.view.onAnswer = (answers) => this.onAnswer(state, question, answers);

    this.view.onBackBtnClick = () => {
      this.stopTimer();
      repeatGame();
    };
  }

  onAnswer(state, question, answers) {
    this.stopTimer();
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
    this.getNextState(state, answer);
  }

  getNextState(state, answer) {
    const nextState = Object.assign({}, state);
    nextState.answers.push(answer);
    nextState.level++;
    if (answer === Answer.WRONG) {
      nextState.lives--;
    }
    nextState.time = AnswerTime.MAX;
    this.getNextScreen(nextState);
  }

  getNextScreen(state) {
    const nextState = Object.assign({}, state);
    nextState.time = AnswerTime.MAX;
    if (nextState.level < QUESTIONS_LENGTH && nextState.lives >= 0) {
      Application.showGameModule(nextState);
    } else {
      if (nextState.level !== QUESTIONS_LENGTH && nextState.lives < 0) {
        nextState.lives = 0;
      }
      Application.showStats(nextState);
    }
  }

  tick() {
    this.view.state.time--;
    if (this.view.state.time > 0) {
      this.view.onTick();
    } else {
      this.view.timeExceed();
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default new GameScreen();
