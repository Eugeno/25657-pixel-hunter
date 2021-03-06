import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';

class GameTripleView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `${headerTemplate(this.state)}
  <div class="game">
    <p class="game__task">${this.question.text}</p>
    <form class="game__content game__content--triple">
      ${this.gameOptionsTemplate()}
    </form>
    <div class="stats">
      ${statsTemplate(this.state.answers)}
    </div>
  </div>
${footerTemplate}`;
  }

  gameOptionsTemplate() {
    return this.question.data.map((q, i) => {
      return `<div class="game__option">
        <img src="${q.src}" alt="Option ${i + 1}" width="304">
      </div>`;
    }).join(``);
  }

  bind() {
    const el = this.element;
    const form = el.querySelector(`form`);
    const gameOptions = [...form.querySelectorAll(`.game__option`)];
    const backBtn = el.querySelector(`.back`);
    const answers = this.question.data.map((option) => option.type);
    this.timerElement = el.querySelector(`.game__timer`);
    gameOptions.forEach((option, i) => {
      option.addEventListener(`click`, () => {
        if (answers[i] === answers.slice().sort()[1]) {
          answers[i] = false;
        }
        this.onAnswer(answers);
      });
    });
    backBtn.addEventListener(`click`, () => this.onBackBtnClick());
  }

  onAnswer() {

  }

  onBackBtnClick() {

  }

  onUpdateTimer() {
    this.timerElement.innerHTML = this.state.time;
  }

  onCriticalTime() {
    this.timerElement.classList.add(`game__timer_pulse`);
  }

  onTimeExceed() {
    this.onAnswer(null);
  }
}

export default GameTripleView;
