import Application from '../application';
import StatsView from './stats-view';
import {changeView} from '../utilities';

class StatsScreen {
  init(state) {
    this.view = new StatsView(state);
    changeView(this.view);
    this.view.onBackBtnClick = () => Application.restart();
  }
}

export default new StatsScreen();
