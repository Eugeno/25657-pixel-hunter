import introScreen from './intro/intro';
import greetingScreen from './greeting/greeting';
import rulesScreen from './rules/rules';
import GameScreen from './games/game';
import statsScreen from './stats/stats';
import Loader from './loader';
import {preloadImages} from './utilities';
import {initialState} from './data/game-data';
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
    return initialState;
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
    Application.routes = {
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.STATS]: statsScreen,
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      Application.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init(loadState(data));
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

  static finishGame(state) {
    Loader.saveResults(state).then(() => {
      location.hash = ControllerId.STATS;
    });
  }

  static restart() {
    this.showGreeting();
  }
}

export default Application;
