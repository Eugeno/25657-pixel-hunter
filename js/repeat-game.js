import getIntroBlock from './get-intro-block';
import {initialState} from './data/game-data';

const repeatGame = () => {
  initialState.answers = [];
  getIntroBlock();
};

export default repeatGame;
