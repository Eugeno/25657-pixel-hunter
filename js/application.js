import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './games/game';
import statsScreen from './stats/stats';
import Loader from './loader';
import {preloadImages} from './utilities';
import adapt from './data/questions-adapter';

const ControllerId = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const saveState = (state) => {
  return btoa(JSON.stringify(state));
};

const loadState = (data) => {
  try {
    return JSON.parse(atob(data));
  } catch (e) {
    Application.showGreeting();
    return ``;
  }
};

class Application {
  static prepareData() {
    introScreen.show();
    Loader.loadData().
        then(adapt).
        then((questions) => preloadImages(questions)).
        then((questions) => Application.init(questions)).
        catch(window.console.error);
  }

  static init(questions) {
    introScreen.hide();
    this.routes = {
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.STATS]: statsScreen,
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      if (data) {
        controller.init(loadState(data));
      } else {
        controller.init();
      }
    } else {
      this.showGreeting();
    }
  }

  static showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  static showRules() {
    location.hash = ControllerId.RULES;
  }

  static showGameModule(state) {
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    location.hash = `${ControllerId.STATS}?${saveState(state)}`;
  }
}

export default Application;
