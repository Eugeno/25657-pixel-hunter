import Application from '../application';
import RulesView from './rules-view';
import {changeView} from '../utilities';
import {initialState} from '../data/game-data';
import repeatGame from '../repeat-game';

class RulesScreen {
  constructor() {
    this.view = new RulesView(initialState);
  }

  init() {
    changeView(this.view);
    this.view.onStart = () => {
      const nextState = Object.assign({}, initialState);
      nextState.answers = initialState.answers.slice(0);
      Application.showGameModule(nextState);
    };
    this.view.onBackBtnClick = () => repeatGame();
  }
}

export default new RulesScreen();
