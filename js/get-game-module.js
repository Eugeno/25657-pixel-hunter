import {questions} from './data/game-data';
import getGameSingle from './get-game-single';
import getGameDouble from './get-game-double';
import getGameTriple from './get-game-triple';

const getGameModule = (state) => {
  switch (questions[state.level].type) {
    case `single`:
      getGameSingle(state, questions[state.level]);
      break;
    case `double`:
      getGameDouble(state, questions[state.level]);
      break;
    case `triple`:
      getGameTriple(state, questions[state.level]);
      break;
  }
};

export default getGameModule;
