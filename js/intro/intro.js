import IntroView from './intro-view';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  show() {
    const main = document.querySelector(`main`);
    this.view.element.classList.add(`intro-wrap`);
    main.appendChild(this.view.element);
  }

  hide() {
    this.view.element.classList.add(`fade`);
    setTimeout(() => {
      this.view.element.remove();
    }, 500);
  }
}

export default new IntroScreen();
