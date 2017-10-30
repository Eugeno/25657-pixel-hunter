import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';

class GameSingleView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content game__content--wide">
      <div class="game__option">
        <img src="${this.question.data[0].src}" alt="Option 1" width="705">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--wide game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
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
    const answers = [];
    form.addEventListener(`change`, () => {
      answers.push(form.querySelector(`input[type="radio"]:checked`).value);
      this.onAnswer(answers);
    });
    backBtn.addEventListener(`click`, this.onBackBtnClick);
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

export default GameSingleView;
