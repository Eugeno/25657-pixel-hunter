import questions from './main';
import getGameSingle from './get-game-single';
import getGameDouble from './get-game-double';
import getGameTriple from './get-game-triple';

const getGameModule = (state) => {
  switch (questions[state.level].type) {
    case `single`:
      getGameSingle();
      break;
    case `double`:
      getGameDouble();
      break;
    case `triple`:
      getGameTriple();
      break;
  }
};

export default getGameModule;
