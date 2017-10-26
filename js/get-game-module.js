import questions from './main';
import getGameSingle from './get-game-single';
import getGameDouble from './get-game-double';
import getGameTriple from './get-game-triple';

const getGameModule = (state) => {
  switch (questions[state.level].type) {
    case `single`:
      getGameSingle(state);
      break;
    case `double`:
      getGameDouble(state);
      break;
    case `triple`:
      getGameTriple(state);
      break;
  }
};

export default getGameModule;
