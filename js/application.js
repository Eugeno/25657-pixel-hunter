import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import statsScreen from './stats/stats';
import {initialState} from './data/game-data';
import {getGameModule} from './route-methods';

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
    getGameModule(nextState);
  }

  static showStats(state) {
    statsScreen.init(state);
  }
}

export default Application;
