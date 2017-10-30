import AbstractView from '../abstract-view';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import headerTemplate from '../components/header';
import {Answer, countScores, Reward, initialState} from '../data/game-data';

class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.scores = countScores(state);
    this.totalReward = Object.keys(this.scores).reduce((sum, key) => sum + parseInt(this.scores[key], 10), 0);
    this.resultTotal = this.scores === -1 ? `FAIL` : this.scores[Answer.CORRECT];
    this.fastAnswers = this.scores[Answer.FAST] / Reward[Answer.FAST];
    this.slowAnswers = this.scores[Answer.SLOW] / Reward[Answer.SLOW];
    this.lives = this.scores.LIVE / Reward.LIVE;
  }

  getDetailedStat() {
    if (this.scores === -1) {
      return `<tr>
          <td class="result__number">1.</td>
          <td>
            ${statsTemplate(this.state)}
          </td>
          <td class="result__total"></td>
          <td class="result__total result__total--final">${this.resultTotal}</td>
        </tr>`;
    }
    return `<tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsTemplate(this.state)}
        </td>
        <td class="result__points">×&nbsp;${Reward[Answer.CORRECT]}</td>
        <td class="result__total">${this.resultTotal}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Reward[Answer.FAST]}</td>
        <td class="result__total">${this.scores[Answer.FAST]}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Reward.LIVE}</td>
        <td class="result__total">${this.scores.LIVE}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Reward[Answer.SLOW]}</td>
        <td class="result__total">${this.scores[Answer.SLOW]}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total result__total--final">${this.totalReward}</td>
      </tr>`;
  }

  get template() {
    return `${headerTemplate(this.state)}
    <div class="result">
      <h1>Победа!</h1>
      <table class="result__table">
        ${this.getDetailedStat()}
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            ${statsTemplate(initialState)}
          </td>
          <td class="result__total"></td>
          <td class="result__total result__total--final">fail</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            ${statsTemplate(initialState)}
          </td>
          <td class="result__points">×&nbsp;${Reward[`correct`]}</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${Reward[`LIVE`]}</td>
          <td class="result__total">100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total result__total--final">950</td>
        </tr>
      </table>
    </div>
  ${footerTemplate}`;
  }

  bind() {
    const el = this.element;
    const backBtn = el.querySelector(`.back`);
    backBtn.addEventListener(`click`, this.onBackBtnClick);
  }

  onBackBtnClick() {

  }
}

export default StatsView;
