import Application from '../application';
import IntroView from './intro-view';
import {changeView} from '../utilities';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);
    this.view.onStart = () => {
      Application.showGreeting();
    };
  }
}

export default new IntroScreen();
