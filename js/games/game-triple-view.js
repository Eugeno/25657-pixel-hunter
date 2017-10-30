import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';
import {MAX_ANSWER_TIME} from '../data/game-data';

class GameTripleView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  gameOptionsTemplate() {
    return this.question.data.map((q, i) => {
      return `<div class="game__option">
        <img src="${q.src}" alt="Option ${i + 1}" width="304">
      </div>`;
    }).join(``);
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">Найдите ${this.question.task.text} среди изображений</p>
    <form class="game__content game__content--triple">
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
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    const backBtn = el.querySelector(`.back`);
    gameOptions.forEach((option, i) => {
      option.addEventListener(`click`, () => {
        this.onAnswer(option, i);
      });
    });
    backBtn.addEventListener(`click`, this.onBackBtnClick);
  }

  onAnswer() {

  }

  onBackBtnClick() {

  }

  tick() {
    this.state.time++;
    this.element.querySelector(`.game__timer`).innerHTML = this.state.time;
    if (this.state.time >= MAX_ANSWER_TIME) {
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

export default GameTripleView;
