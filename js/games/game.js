import Application from '../application';
import {changeView} from '../utilities';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';
import {QUESTIONS_LENGTH, AnswerTime, Answer, GameType} from '../data/game-data';

class GameScreen {
  constructor(data) {
    this.questions = data;
  }

  init(state) {
    const GameModules = {
      [GameType.SINGLE]: GameSingleView,
      [GameType.DOUBLE]: GameDoubleView,
      [GameType.TRIPLE]: GameTripleView,
    };
    const question = this.questions[state.level];
    this.view = new GameModules[question.type](state, question);
    changeView(this.view);

    this.timer = setInterval(() => {
      this._updateTimer();
    }, 1000);

    this.view.onAnswer = (answers) => this.onAnswer(state, question, answers);

    this.view.onBackBtnClick = () => {
      // eslint-disable-next-line
      const isRestart = confirm(`Текущая игра будет потеряна. Начать заново?`);
      if (isRestart) {
        this._stopTimer();
        Application.showGreeting();
      }
    };
  }

  _updateTimer() {
    this.view.state.time--;
    if (this.view.state.time > 0) {
      this.view.onUpdateTimer();
      if (this.view.state.time === AnswerTime.CRITICAL) {
        this.view.onCriticalTime();
      }
    } else {
      this.view.onTimeExceed();
    }
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  onAnswer(state, question, answers) {
    this._stopTimer();
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

    const nextState = Object.assign({}, state);
    nextState.answers.push(answer);
    nextState.level++;
    if (answer === Answer.WRONG) {
      nextState.lives--;
    }

    nextState.time = AnswerTime.MAX;
    if (nextState.level < QUESTIONS_LENGTH && nextState.lives >= 0) {
      Application.showGameModule(nextState);
    } else {
      if (nextState.level !== QUESTIONS_LENGTH && nextState.lives < 0) {
        nextState.lives = 0;
      }
      Application.finishGame(nextState);
    }
  }
}

export default GameScreen;
