import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import gameScreen from './games/game';
import GameSingleView from './games/game-single-view';
import GameDoubleView from './games/game-double-view';
import GameTripleView from './games/game-triple-view';
import statsScreen from './stats/stats';
import {initialState, GameType, questions} from './data/game-data';

class Application {
  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    rulesScreen.init();
  }

  static showGame(state = initialState) {
    const nextState = Object.assign({}, state);
    nextState.answers = state.answers.slice(0);
    this.showGameModule(nextState);
    // getGameModule(nextState);
  }

  static showGameModule(state) {
    const GameModules = {
      [GameType.SINGLE]: GameSingleView,
      [GameType.DOUBLE]: GameDoubleView,
      [GameType.TRIPLE]: GameTripleView,
    };
    const nextQuestion = questions[state.level];
    const gameModule = new GameModules[nextQuestion.type](state, nextQuestion);
    gameScreen.init(state, nextQuestion, gameModule);
  }

  static showStats(state) {
    statsScreen.init(state);
  }
}

export default Application;
