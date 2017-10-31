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
    this.view.onStart = () => Application.showGame();
    this.view.onBackBtnClick = () => repeatGame();
  }
}

export default new RulesScreen();
