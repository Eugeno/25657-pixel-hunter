import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import footerTemplate from './components/footer';
import headerTemplate from './components/header';
import statsTemplate from './components/stats';
import {Answer, countScores, Reward, initialState} from './data/game-data';
import repeatGame from './repeat-game';

const moduleStats = (state) => {
  const scores = countScores(state);
  const totalReward = Object.keys(scores).reduce((sum, key) => sum + parseInt(scores[key], 10), 0);
  const resultTotal = scores === -1 ? `FAIL` : scores[Answer.CORRECT];
  const fastAnswers = scores[Answer.FAST] / Reward[Answer.FAST];
  const slowAnswers = scores[Answer.SLOW] / Reward[Answer.SLOW];
  const lives = scores.LIVE / Reward.LIVE;

  const getDetailedStat = () => {
    if (scores === -1) {
      return `<tr>
          <td class="result__number">1.</td>
          <td>
            ${statsTemplate(state)}
          </td>
          <td class="result__total"></td>
          <td class="result__total result__total--final">${resultTotal}</td>
        </tr>`;
    }
    return `<tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsTemplate(state)}
        </td>
        <td class="result__points">×&nbsp;${Reward[Answer.CORRECT]}</td>
        <td class="result__total">${resultTotal}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Reward[Answer.FAST]}</td>
        <td class="result__total">${scores[Answer.FAST]}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Reward.LIVE}</td>
        <td class="result__total">${scores.LIVE}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Reward[Answer.SLOW]}</td>
        <td class="result__total">${scores[Answer.SLOW]}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total result__total--final">${totalReward}</td>
      </tr>`;
  };

  return getElementFromTemplate(`${headerTemplate(state)}
    <div class="result">
      <h1>Победа!</h1>
      <table class="result__table">
        ${getDetailedStat()}
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
  ${footerTemplate}`);
};

const getStatsBlock = (state) => {
  renderBlock(moduleStats(state));
  document.querySelector(`.back`).addEventListener(`click`, () => repeatGame());
};

export default getStatsBlock;
