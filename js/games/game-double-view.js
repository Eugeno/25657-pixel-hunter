import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';

class GameDoubleView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  gameOptionsTemplate() {
    return this.question.data.map((q, i) => {
      return `<div class="game__option">
        <img src="${q.src}" alt="Option ${i + 1}" width="468">
        <label class="game__answer game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
    }).join(``);
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">  
      ${this.gameOptionsTemplate()}
    </form>
    <div class="stats">
      ${statsTemplate(this.state)}
    </div>
  </div>
${footerTemplate}`;
  }

  bind() {
    const el = this.element;
    const form = el.querySelector(`form`);
    const backBtn = el.querySelector(`.back`);
    form.addEventListener(`change`, this.onAnswer);
    backBtn.addEventListener(`click`, this.onBackBtnClick);
  }

  onAnswer() {

  }

  onBackBtnClick() {

  }

  tick() {
    this.state.time--;
    this.element.querySelector(`.game__timer`).innerHTML = this.state.time;
    if (this.state.time === 0) {
      this.timeExceed();
    } else {
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  timeExceed() {
    this.onAnswer();
  }
}

export default GameDoubleView;
