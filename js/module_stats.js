import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {countScores, Reward, initialState, currentState} from './data/game-data';
import startNewGame from './start-new-game';

const getStats = () => {
  const scores = countScores(currentState);
  const totalReward = Object.keys(scores).reduce((sum, key) => sum + parseInt(scores[key], 10), 0);
  const resultTotal = scores === -1 ? `FAIL` : scores[`correct`];

  const moduleStats = () => getElementFromTemplate(`${headerTemplate(currentState)}
    <div class="result">
      <h1>Победа!</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${statsTemplate(currentState)}
          </td>
          <td class="result__points">×&nbsp;${Reward[`correct`]}</td>
          <td class="result__total">${resultTotal}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${scores[`fast`] / Reward[`fast`]}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${Reward[`fast`]}</td>
          <td class="result__total">${scores[`fast`]}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${scores[`live`] / Reward[`LIVE`]}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${Reward[`LIVE`]}</td>
          <td class="result__total">${scores[`live`]}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${scores[`slow`] / Reward[`slow`]}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${Reward[`slow`]}</td>
          <td class="result__total">${scores[`slow`]}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total result__total--final">${totalReward}</td>
        </tr>
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

  renderBlock(moduleStats());
  document.querySelector(`.back`).addEventListener(`click`, () => startNewGame);
};

export default getStats;
