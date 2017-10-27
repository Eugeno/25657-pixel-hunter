import {questions, GameType} from './data/game-data';
import getGameSingle from './get-game-single';
import getGameDouble from './get-game-double';
import getGameTriple from './get-game-triple';

const getGameModule = (state) => {
  switch (questions[state.level].type) {
    case GameType.SINGLE:
      getGameSingle(state, questions[state.level]);
      break;
    case GameType.DOUBLE:
      getGameDouble(state, questions[state.level]);
      break;
    case GameType.TRIPLE:
      getGameTriple(state, questions[state.level]);
      break;
  }
};

export default getGameModule;
