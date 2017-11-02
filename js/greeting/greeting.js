import Application from '../application';
import GreetingView from './greeting-view';
import {changeView} from '../utilities';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    changeView(this.view);
    this.view.onNextBtnClick = () => Application.showRules();
  }

  fadeOut() {
    this.view.fadeOut();
  }

  fadeIn() {
    this.view.fadeIn();
  }
}

export default new GreetingScreen();
