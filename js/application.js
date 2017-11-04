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
  static async prepareData() {
    greetingScreen.init();
    greetingScreen.hide();
    introScreen.show();

    try {
      const data = await Loader.loadData();
      const questions = adapt(data);
      await preloadImages(questions);
      Application.init(questions);
      greetingScreen.show();
      await introScreen.hide();
    } catch (e) {
      introScreen.showError(e.message);
    }
  }

  static init(questions) {
    Application.routes = {
      [ControllerId.GREETING]: greetingScreen,
      [ControllerId.RULES]: rulesScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.STATS]: statsScreen,
    };

    window.addEventListener(`hashchange`, () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      Application.changeHash(id, data);
    });
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

  static async finishGame(state) {
    await Loader.saveResults(state);
    statsScreen.saveName(state.name);
    location.hash = ControllerId.STATS;
  }

  static restart() {
    this.showGreeting();
  }
}

export default Application;
