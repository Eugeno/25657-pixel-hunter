import getElementFromTemplate from './get-element';
import renderBlock from './render-block';
import moduleIntro from './module_intro';
import footerTemplate from './footer';
import headerTemplate from './header';
import statsTemplate from './stats';
import {initialState} from './data';
import {countScores, Reward} from './game-data';

const moduleStats = getElementFromTemplate(`${headerTemplate(initialState)}
  <div class="result">
    <h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsTemplate(initialState)}
        </td>
        <td class="result__points">×&nbsp;${Reward[`correct`]}</td>
        <td class="result__total">${countScores([
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `correct`,
    `wrong`
], 3)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Reward[`fast`] - Reward[`correct`]}</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Reward[`LIVE`]}</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Reward[`correct`] - Reward[`slow`]}</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total result__total--final">950</td>
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
moduleStats.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro));

export default moduleStats;
