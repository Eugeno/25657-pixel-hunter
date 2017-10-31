import StatsView from './stats-view';
import {changeView} from '../utilities';
import repeatGame from '../repeat-game';

const getStats = (state) => {
  const statsBlock = new StatsView(state);
  statsBlock.onBackBtnClick = () => repeatGame();
  changeView(statsBlock);
};

export default getStats;
