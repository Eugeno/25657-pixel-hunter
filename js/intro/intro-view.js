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

  bind() {
    const nextBtn = this.element.querySelector(`.intro__asterisk`);
    nextBtn.addEventListener(`click`, () => this.onStart());
  }

  onStart() {

  }

  show() {
    const main = document.querySelector(`main`);
    this.element.classList.add(`intro-wrap`);
    main.appendChild(this.element);
  }

  hide() {
    this.element.classList.add(`fade`);
    // this.element.addEventListener(`transitionend`, alert(`dezkf`), false);
    setTimeout(() => {
      this.element.remove();
    }, 500);
  }
}

export default IntroView;
