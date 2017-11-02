import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';
import {AnswerType} from '../data/game-data';

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
          <input name="question${i + 1}" type="radio" value="${AnswerType.PHOTO}">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i + 1}" type="radio" value="${AnswerType.PAINT}">
          <span>Рисунок</span>
        </label>
      </div>`;
    }).join(``);
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">${this.question.text}</p>
    <form class="game__content">  
      ${this.gameOptionsTemplate()}
    </form>
    <div class="stats">
      ${statsTemplate(this.state.answers)}
    </div>
  </div>
${footerTemplate}`;
  }

  bind() {
    const el = this.element;
    const form = el.querySelector(`form`);
    const backBtn = el.querySelector(`.back`);
    const countChecked = () => form.querySelectorAll(`input[type="radio"]:checked`).length;
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    form.addEventListener(`change`, () => {
      if (countChecked() === gameOptions.length) {
        const answers = gameOptions.map((option) => option.querySelector(`input[type="radio"]:checked`).value);
        this.onAnswer(answers);
      }
    });
    backBtn.addEventListener(`click`, () => this.onBackBtnClick());
  }

  onAnswer() {

  }

  onBackBtnClick() {

  }

  onTick() {
    this.element.querySelector(`.game__timer`).innerHTML = this.state.time;
  }

  timeExceed() {
    this.onAnswer(null);
  }
}

export default GameDoubleView;
