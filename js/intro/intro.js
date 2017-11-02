import IntroView from './intro-view';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  show() {
    this.view.show();
  }

  hide() {
    this.view.hide();
  }
}

export default new IntroScreen();
