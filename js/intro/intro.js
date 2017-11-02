import IntroView from './intro-view';
import {addIntroView} from '../utilities';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  show() {
    addIntroView(this.view);
  }

  hide() {
    this.view.element.classList.add(`fade`);
    setTimeout(() => {
      this.view.element.remove();
    }, 500);
  }
}

export default new IntroScreen();
