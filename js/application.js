import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import getRules from './rules/rules';

class Application {
  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    greetingScreen.init();
  }

  static showRules() {
    getRules();
  }
}

export default Application;
