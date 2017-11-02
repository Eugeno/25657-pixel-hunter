import AbstractView from '../abstract-view';
import headerTemplate from '../components/header';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import {Answer, Reward, initialState, countScores} from '../data/game-data';

class StatsView extends AbstractView {
  get template() {
    return `${headerTemplate(initialState)}
    <div class="result">
      <h2>Данные загружаются</h2>
    </div>
    ${footerTemplate}`;
  }

  bind() {
    const el = this.element;
    const backBtn = el.querySelector(`.back`);
    backBtn.addEventListener(`click`, () => this.onBackBtnClick());
    this.scoresElement = el.querySelector(`.result`);
  }

  onBackBtnClick() {

  }

  printScores(data) {
    this.state = data.reverse();
    this.fastReward = Reward[Answer.FAST] - Reward[Answer.CORRECT];
    this.slowReward = Reward[Answer.CORRECT] - Reward[Answer.SLOW];
    this.scores = (state) => countScores(state);
    this.fastAnswers = (scores) => scores[Answer.FAST] / Reward[Answer.FAST];
    this.slowAnswers = (scores) => scores[Answer.SLOW] / Reward[Answer.SLOW];
    this.resultFail = `FAIL`;
    this.resultTotal = (scores) => scores[Answer.CORRECT] + (this.fastAnswers(scores) + this.slowAnswers(scores)) * Reward[Answer.CORRECT];
    this.heading = (state) => this.scores(state) === -1 ? `Это провал!` : `Победа!`;
    this.totalFastReward = (scores) => this.fastReward * this.fastAnswers(scores);
    this.totalSlowReward = (scores) => -this.slowReward * this.slowAnswers(scores);
    this.lives = (scores) => scores.LIVE / Reward.LIVE;
    this.totalReward = (scores) => Object.keys(scores).reduce((sum, key) => sum + parseInt(scores[key], 10), 0);
    this.scoresElement.innerHTML = `<h1>${this.heading(this.state[0])}</h1>
      ${this.getStatsTables()}`;
  }

  getStatsTables() {
    return this.state.map((state, i) => {
      const scores = this.scores(state);
      if (scores === -1) {
        return `<table class="result__table">
          <tr>
            <td class="result__number">${i + 1}.</td>
            <td>
              ${statsTemplate(state)}
            </td>
            <td class="result__total"></td>
            <td class="result__total result__total--final">${this.resultFail}</td>
          </tr>
        </table>`;
      }
      return `<table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            ${statsTemplate(state)}
          </td>
          <td class="result__points">×&nbsp;${Reward[Answer.CORRECT]}</td>
          <td class="result__total">${this.resultTotal(scores)}</td>
        </tr>
        ${this.getSpeedBonus(scores)}
        ${this.getLivesBonus(scores)}
        ${this.getSlowBonus(scores)}
        <tr>
          <td colspan="5" class="result__total result__total--final">${this.totalReward(scores)}</td>
        </tr>
      </table>`;
    }).join(``);
  }

  getSpeedBonus(scores) {
    if (this.fastAnswers(scores)) {
      return `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.fastAnswers(scores)}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${this.fastReward}</td>
        <td class="result__total">${this.totalFastReward(scores)}</td>
      </tr>`;
    }
    return ``;
  }

  getLivesBonus(scores) {
    if (this.lives(scores)) {
      return `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.lives(scores)}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Reward.LIVE}</td>
        <td class="result__total">${scores.LIVE}</td>
      </tr>`;
    }
    return ``;
  }

  getSlowBonus(scores) {
    if (this.slowAnswers(scores)) {
      return `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.slowAnswers(scores)}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${this.slowReward}</td>
        <td class="result__total">${this.totalSlowReward(scores)}</td>
      </tr>`;
    }
    return ``;
  }
}

export default StatsView;
