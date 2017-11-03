import IntroView from './intro-view';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  show() {
    this.view.show();
  }

  async hide() {
    await this.view.hide();
    this.view.remove();
  }

  showError(errorMessage) {
    this.view.showError(errorMessage);
  }
}

export default new IntroScreen();
