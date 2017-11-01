import IntroView from './intro-view';
import {changeView} from '../utilities';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  show() {
    changeView(this.view);
  }
}

export default new IntroScreen();
