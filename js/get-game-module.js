import questions from './main';
import getGameSingle from './get-game-single';
import getGameDouble from './get-game-double';
import getGameTriple from './get-game-triple';

const getGameModule = (state) => {
  console.log(questions[state.level]);
  switch (questions[state.level].type) {
    case `single`:
      getGameSingle(state);
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
