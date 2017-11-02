import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';
import {AnswerType} from '../data/game-data';

class GameSingleView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">${this.question.text}</p>
    <form class="game__content game__content--wide">
      <div class="game__option">
        <img src="${this.question.data[0].src}" alt="Option 1" width="705">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="${AnswerType.PHOTO}">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--wide game__answer--paint">
          <input name="question1" type="radio" value="${AnswerType.PAINT}">
          <span>Рисунок</span>
        </label>
      </div>
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
    form.addEventListener(`change`, () => {
      const answers = [form.querySelector(`input[type="radio"]:checked`).value];
      this.onAnswer(answers);
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

  onTimeExceed() {
    this.onAnswer(null);
  }
}

export default GameSingleView;
