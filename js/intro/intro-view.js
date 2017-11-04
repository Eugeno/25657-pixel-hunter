import AbstractView from '../abstract-view';

class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;
  }

  show() {
    const main = document.querySelector(`main`);
    this.element.classList.add(`intro-wrap`);
    main.appendChild(this.element);
  }

  hide() {
    return new Promise((resolve) => {
      this.element.addEventListener(`transitionend`, resolve);
      this.element.classList.add(`fade`);
    });
  }

  remove() {
    this.element.remove();
  }

  showError(errorMessage) {
    this.element.textContent = errorMessage;
  }
}

export default IntroView;
