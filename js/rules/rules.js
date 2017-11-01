import Application from '../application';
import RulesView from './rules-view';
import {changeView} from '../utilities';
import {initialState} from '../data/game-data';

class RulesScreen {
  constructor() {
    this.view = new RulesView(initialState);
  }

  init() {
    changeView(this.view);
    this.view.onStart = () => {
      event.preventDefault();
      const nextState = Object.assign({}, initialState);
      nextState.answers = initialState.answers.slice(0);
      Application.showGameModule(nextState);
    };
    this.view.onBackBtnClick = () => Application.showGreeting();
  }
}

export default new RulesScreen();
