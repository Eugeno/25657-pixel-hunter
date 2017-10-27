import {QUESTIONS_LENGTH, Answer} from './data/game-data';
import getGameModule from './get-game-module';
import getStatsBlock from './get-stats-block';

const getNextState = (state, answer) => {
  state.answers.push(answer);
  state.level++;
  if (answer === Answer.WRONG) {
    state.lives--;
  }
  if (state.level < QUESTIONS_LENGTH && state.lives > 0) {
    getGameModule(state);
  } else {
    getStatsBlock(state);
  }
};

export default getNextState;
