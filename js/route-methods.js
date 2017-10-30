import {QUESTIONS_LENGTH, GameType, questions} from './data/game-data';
import getGameSingle from './games/game-single';
import getGameDouble from './games/game-double';
import getGameTriple from './games/game-triple';
import getStats from './stats/stats';

const getGameModule = (state) => {
  const GameTypes = {
    [GameType.SINGLE]: getGameSingle,
    [GameType.DOUBLE]: getGameDouble,
    [GameType.TRIPLE]: getGameTriple,
  };
  GameTypes[questions[state.level].type](state, questions[state.level]);
};

const getNextScreen = (state) => {
  if (state.level < QUESTIONS_LENGTH && state.lives > 0) {
    getGameModule(state);
  } else {
    getStats(state);
  }
};

export {getGameModule, getNextScreen};
