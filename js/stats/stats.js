import StatsView from './stats-view';
import {changeView} from '../utilities';
import repeatGame from '../repeat-game';

class StatsScreen {
  init(state) {
    this.view = new StatsView(state);
    changeView(this.view);
    this.view.onBackBtnClick = () => repeatGame();
  }
}

export default new StatsScreen();
