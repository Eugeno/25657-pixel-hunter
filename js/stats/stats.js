import Application from '../application';
import StatsView from './stats-view';
import {changeView} from '../utilities';
import Loader from '../loader';
import {Answer, Reward, countScores} from '../data/game-data';

const Results = {
  HEADING_WIN: `Победа!`,
  HEADING_FAIL: `Поражение!`,
  TOTAL_FAIL: `FAIL`
};

class StatsScreen {
  init() {
    this.view = new StatsView();
    changeView(this.view);
    this.view.onBackBtnClick = () => Application.restart();

    const getResults = (data) => {
      return data.reverse().map((result) => {
        const scores = countScores(result);
        const fastAnswers = scores[Answer.FAST] / Reward[Answer.FAST];
        const slowAnswers = scores[Answer.SLOW] / Reward[Answer.SLOW];
        return {
          scores,
          answers: result.answers,
          correctReward: Reward[Answer.CORRECT],
          fastBonus: Reward[Answer.FAST] - Reward[Answer.CORRECT],
          slowPenalty: Reward[Answer.CORRECT] - Reward[Answer.SLOW],
          livesReward: Reward.LIVE,
          fastAnswers,
          slowAnswers,
          heading: scores === -1 ? Results.HEADING_FAIL : Results.HEADING_WIN,
          totalCorrectResult: scores === -1 ? Results.TOTAL_FAIL : scores[Answer.CORRECT] + (fastAnswers + slowAnswers) * Reward[Answer.CORRECT],
          totalFastBonus: (Reward[Answer.FAST] - Reward[Answer.CORRECT]) * fastAnswers,
          totalSlowPenalty: (Reward[Answer.SLOW] - Reward[Answer.CORRECT]) * slowAnswers,
          totalLivesReward: scores.LIVE,
          lives: scores.LIVE / Reward.LIVE,
          totalReward: Object.keys(scores).reduce((sum, key) => sum + parseInt(scores[key], 10), 0),
        };
      });
    };

    Loader.loadResults(this.name).
        then((data) => getResults(data)).
        then((data) => this.view.printScores(data));
  }

  saveName(name) {
    this.name = name;
  }
}

export default new StatsScreen();
