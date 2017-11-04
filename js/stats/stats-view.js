import AbstractView from '../abstract-view';
import headerTemplate from '../components/header';
import footerTemplate from '../components/footer';
import statsTemplate from '../components/stats';
import {initialState} from '../data/game-data';

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

  printScores(data) {
    this.scoresElement.innerHTML = `<h1>${data[0].heading}</h1>
      ${this._getStatsTables(data)}`;
  }

  _getStatsTables(data) {
    const getSpeedBonus = (result) => {
      if (result.fastAnswers) {
        return `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${result.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${result.fastBonus}</td>
        <td class="result__total">${result.totalFastBonus}</td>
      </tr>`;
      }
      return ``;
    };

    const getSlowBonus = (result) => {
      if (result.slowAnswers) {
        return `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${result.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${result.slowPenalty}</td>
        <td class="result__total">${result.totalSlowPenalty}</td>
      </tr>`;
      }
      return ``;
    };

    const getLivesBonus = (result) => {
      if (result.lives) {
        return `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${result.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${result.livesReward}</td>
        <td class="result__total">${result.totalLivesReward}</td>
      </tr>`;
      }
      return ``;
    };

    return data.map((result, i) => {
      if (result.scores === -1) {
        return `<table class="result__table">
          <tr>
            <td class="result__number">${i + 1}.</td>
            <td>
              ${statsTemplate(result.answers)}
            </td>
            <td class="result__total"></td>
            <td class="result__total result__total--final">${result.totalCorrectResult}</td>
          </tr>
        </table>`;
      }
      return `<table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            ${statsTemplate(result.answers)}
          </td>
          <td class="result__points">×&nbsp;${result.correctReward}</td>
          <td class="result__total">${result.totalCorrectResult}</td>
        </tr>
        ${getSpeedBonus(result)}
        ${getLivesBonus(result)}
        ${getSlowBonus(result)}
        <tr>
          <td colspan="5" class="result__total result__total--final">${result.totalReward}</td>
        </tr>
      </table>`;
    }).join(``);
  }

  onBackBtnClick() {

  }
}

export default StatsView;
