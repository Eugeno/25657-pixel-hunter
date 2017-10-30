import StatsView from './stats-view';
import renderBlock from '../render-block';
import repeatGame from '../repeat-game';

const getStats = (state) => {
  const statsBlock = new StatsView(state);
  statsBlock.onBackBtnClick = () => repeatGame();
  renderBlock(statsBlock);
};

export default getStats;
