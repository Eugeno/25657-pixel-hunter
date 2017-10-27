import {QUESTIONS_LENGTH} from './data/game-data';
import getGameModule from './get-game-module';
import getStatsBlock from './get-stats-block';

const getNextScreen = (state) => {
  if (state.level < QUESTIONS_LENGTH && state.lives > 0) {
    getGameModule(state);
  } else {
    getStatsBlock(state);
  }
};

export default getNextScreen;
