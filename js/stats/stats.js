import Application from '../application';
import StatsView from './stats-view';
import {changeView} from '../utilities';
import Loader from '../loader';

class StatsScreen {
  init() {
    this.view = new StatsView();
    changeView(this.view);
    this.view.onBackBtnClick = () => Application.restart();
    Loader.loadResults(this.name).then((data) => this.view.printScores(data));
  }

  saveName(name) {
    this.name = name;
  }
}

export default new StatsScreen();
