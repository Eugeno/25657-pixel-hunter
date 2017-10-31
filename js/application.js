import introScreen from './intro/intro';

import getGreeting from './greeting/greeting';

class Application {
  static showIntro() {
    introScreen.init();
  }

  static showGreeting() {
    getGreeting();
  }
}

export default Application;
