import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import gameScreen from './games/game';
import statsScreen from './stats/stats';

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

  static startGame(state) {
    this.showGameModule(state);
  }

  static showGameModule(state) {
    gameScreen.init(state);
  }

  static showStats(state) {
    statsScreen.init(state);
  }
}

export default Application;
